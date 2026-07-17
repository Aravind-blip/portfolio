// A small, deterministic weighted-token matcher over the static portfolio
// index. No fuzzy matching, no library, no network — the index is small
// enough (a few dozen items) that a straightforward pass over every item on
// every keystroke is effectively instant, and a plain data structure keeps
// ranking auditable rather than a black box.
const WEIGHTS = {
  exactTitle: 100,
  titlePrefix: 70,
  technologyOrTopic: 50,
  keyword: 35,
  description: 20,
  searchText: 8,
  allTokensPresent: 5,
};

function normalize(value) {
  return (value || "").toString().toLowerCase().trim().replace(/\s+/g, " ");
}

function includesQuery(list, query) {
  return (list || []).some((entry) => {
    const normalized = normalize(entry);
    return normalized === query || normalized.includes(query);
  });
}

export function searchPortfolio(items, rawQuery, { limit } = {}) {
  const query = normalize(rawQuery);
  if (!query) return [];

  const tokens = query.split(" ").filter(Boolean);

  const results = items
    .map((item) => {
      const title = normalize(item.title);
      const description = normalize(item.description);
      const searchText = normalize(item.searchText);
      let score = 0;
      const matchedOn = [];

      if (title === query) {
        score += WEIGHTS.exactTitle;
        matchedOn.push("title");
      } else if (title.startsWith(query)) {
        score += WEIGHTS.titlePrefix;
        matchedOn.push("title");
      }

      if (includesQuery(item.technologies, query) || includesQuery(item.topics, query)) {
        score += WEIGHTS.technologyOrTopic;
        matchedOn.push("technology");
      }

      if (includesQuery(item.keywords, query)) {
        score += WEIGHTS.keyword;
        matchedOn.push("keyword");
      }

      if (description.includes(query)) {
        score += WEIGHTS.description;
        matchedOn.push("description");
      }

      if (searchText.includes(query)) {
        score += WEIGHTS.searchText;
        matchedOn.push("content");
      } else if (tokens.length > 1 && tokens.every((token) => searchText.includes(token) || title.includes(token))) {
        score += WEIGHTS.allTokensPresent;
        matchedOn.push("content");
      }

      return { item, score, matchedOn };
    })
    .filter((result) => result.score > 0);

  // Deterministic ordering: score, then the item's own declared priority,
  // then id — so two equally-scored results never swap order between runs.
  results.sort((a, b) => b.score - a.score || a.item.priority - b.item.priority || a.item.id.localeCompare(b.item.id));

  return typeof limit === "number" ? results.slice(0, limit) : results;
}

export const GROUP_ORDER = [
  "Navigation Action",
  "System",
  "Repository",
  "Lab Entry",
  "Journal Article",
  "Experience",
  "Capability",
];

export const GROUP_LABELS = {
  "Navigation Action": "Quick Navigation",
  System: "Systems",
  Repository: "Open Source",
  "Lab Entry": "Engineering Lab",
  "Journal Article": "Engineering Journal",
  Experience: "Experience and Resume",
  Capability: "Experience and Resume",
};

// Empty-query state: quick navigation plus a small set of featured
// destinations, rather than an empty box or the entire index dumped at once.
export function getDefaultResults(items) {
  const navigationActions = items.filter((item) => item.type === "Navigation Action");
  const featured = items.filter(
    (item) =>
      (item.type === "System" && item.priority === 1) ||
      (item.type === "Lab Entry" && item.priority === 1) ||
      item.type === "Journal Article"
  );
  return [...navigationActions, ...featured].map((item) => ({ item, score: 0, matchedOn: [] }));
}

export function groupResults(results) {
  const groups = new Map();
  for (const result of results) {
    const type = result.item.type;
    const groupLabel = GROUP_LABELS[type] || type;
    if (!groups.has(groupLabel)) groups.set(groupLabel, []);
    groups.get(groupLabel).push(result);
  }

  const order = [...new Set(GROUP_ORDER.map((type) => GROUP_LABELS[type] || type))];
  return order.filter((label) => groups.has(label)).map((label) => ({ label, results: groups.get(label) }));
}
