import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FiLinkedin, FiGithub, FiMail, FiPhone } from "react-icons/fi";

export default function Hero() {
  const { ref: hiRef, inView: hiInView } = useInView({ triggerOnce: true });
  const { ref: nameRef, inView: nameInView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { ref: roleRef, inView: roleInView } = useInView({ triggerOnce: true, threshold: 0.8 });

  const particlesInit = async (engine) => {
    if (engine) {
      await loadFull(engine);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      {/* Particle Background */}
      <Particles
        init={particlesInit}
        options={{
          particles: {
            number: { value: 60 },
            move: { enable: true, speed: 0.8 },
            opacity: { value: 0.4 },
            size: { value: 2.5 }
          }
        }}
        className="absolute inset-0 w-full h-full"
      />

      {/* Main Hero Content */}
      <motion.div 
        ref={hiRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: hiInView ? 1 : 0, y: hiInView ? 0 : -10 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-bold mb-2 flex items-center gap-2"
      >
        Hi <span className="wave text-5xl md:text-6xl">👋</span>
      </motion.div>

      <motion.div 
        ref={nameRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: nameInView ? 1 : 0, y: nameInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold mb-3 text-center"
      >
        Aravind Bandipelli
      </motion.div>

      <motion.div 
        ref={roleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: roleInView ? 1 : 0, y: roleInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg md:text-xl text-gray-400 text-center"
      >
        Data Analyst | Full-Stack Developer | Machine Learning Enthusiast
      </motion.div>

      {/* Footer Section with Contact and Social Links (Kept as Is) */}
      <footer className="absolute bottom-6 w-full flex flex-col items-center justify-center text-gray-400">
        <div className="flex space-x-6">
          <a href="https://www.linkedin.com/in/aravind-bandipelli" target="_blank" rel="noopener noreferrer">
            <FiLinkedin className="text-white text-2xl hover:text-blue-400 transition duration-300" />
          </a>
          <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
            <FiGithub className="text-white text-2xl hover:text-gray-400 transition duration-300" />
          </a>
          <a href="mailto:aravindbandipelli@gmail.com">
            <FiMail className="text-white text-2xl hover:text-red-400 transition duration-300" />
          </a>
          <span className="text-gray-300 flex items-center">
            <FiPhone className="mr-2" /> +1 (561)-915-5545
          </span>
        </div>
      </footer>
    </section>
  );
}
