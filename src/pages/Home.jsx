import Hero from "../components/sections/Hero";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import EngineeringLab from "../components/sections/EngineeringLab";
import Resume from "../components/sections/Resume";
import Contact from "../components/sections/Contact";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Experience />
      <Skills />
      <EngineeringLab />
      <Resume />
      <Contact />
    </>
  );
}

export default Home;
