import ImplementationHighlight from "./ImplementationHighlight";

// A challenge and an implementation highlight are visually the same
// object — a title plus one explanatory paragraph — so this delegates
// rather than re-declaring the same markup a second time. Kept as its own
// named export because "challenge" and "highlight" are different content
// categories in the data model, even though they render identically.
function ChallengeCard({ title, detail }) {
  return <ImplementationHighlight title={title} detail={detail} />;
}

export default ChallengeCard;
