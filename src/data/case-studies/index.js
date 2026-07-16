import { ragAgentAuditCaseStudy } from "./rag-agent-audit";

// Keyed by project slug. Only migrated projects appear here — SystemDetail
// falls back to the legacy ProjectCaseStudy renderer for any slug not
// present in this map, which is how projects migrate one at a time without
// a flag day.
export const caseStudies = {
  "rag-agent-audit": ragAgentAuditCaseStudy,
};
