import ChallengeCard from "./ChallengeCard";
import SectionHeading from "./SectionHeading";

function ChallengesSection({ id, challenges }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>Challenges</SectionHeading>
      <div className="highlight-list">
        {challenges.map((item) => (
          <ChallengeCard title={item.title} detail={item.detail} key={item.title} />
        ))}
      </div>
    </section>
  );
}

export default ChallengesSection;
