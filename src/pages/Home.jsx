import Hero from "../components/sections/Hero";
import FeaturedSystem from "../components/sections/FeaturedSystem";
import Systems from "../components/sections/Systems";
import Engineering from "../components/sections/Engineering";
import OpenSource from "../components/sections/OpenSource";
import EngineeringJournal from "../components/sections/EngineeringJournal";
import EngineeringJourney from "../components/sections/EngineeringJourney";
import EngineeringLab from "../components/sections/EngineeringLab";
import EngineeringMapPreview from "../components/sections/EngineeringMapPreview";
import Resume from "../components/sections/Resume";
import Contact from "../components/sections/Contact";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedSystem />
      <Systems />
      <Engineering />
      <OpenSource />
      <EngineeringJourney />
      <EngineeringLab />
      <EngineeringJournal />
      <EngineeringMapPreview />
      <Resume />
      <Contact />
    </>
  );
}

export default Home;
