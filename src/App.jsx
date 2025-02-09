import Hero from "./components/Hero";
import Skills from "./components/skills";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";                                         
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100">
      <ThemeToggle />
      <Hero />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}