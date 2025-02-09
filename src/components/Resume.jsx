import React from "react";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";

// Updated Education & Certifications Data (Compact Version)
const timelineItems = [
  {
    type: "Education",
    title: "Master of Science in Data Analytics",
    institution: "Indiana Wesleyan University",
    year: "Present",
    gpa: "GPA: 3.825/4.0",
  },
  // {
  //   type: "Certification",
  //   title: "Google Data Analytics Professional Certificate",
  //   institution: "Google (In Progress)",
  //   year: "2024",
  // },
  {
    type: "Certification",
    title: "Microsoft Certified: Azure Data Scientist Associate",
    institution: "Microsoft",
    year: "2023",
  },
  {
    type: "Certification",
    title: "IBM Data Science Professional Certificate",
    institution: "IBM",
    year: "Completed",
  },
  {
    type: "Certification",
    title: "Machine Learning Algorithms",
    institution: "Infosys",
    year: "Completed",
  },
  {
    type: "Certification",
    title: "Infosys Certified Angular Professional",
    institution: "Infosys",
    year: "Completed",
  },
  {
    type: "Certification",
    title: "Infosys Certified C# Programmer",
    institution: "Infosys",
    year: "Completed",
  },
  {
    type: "Certification",
    title: "Infosys Certified .NET Microservices Developer",
    institution: "Infosys",
    year: "Completed",
  }
];


const Resume = () => {
  return (
    <section className="py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">📜 Education & Certifications</h2>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-gray-500 pl-4 space-y-6">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Bullet Point */}
              <div className="absolute -left-3 w-4 h-4 bg-gray-400 rounded-full"></div>

              {/* Timeline Content */}
              <div className="bg-gray-800 text-white p-4 rounded-md shadow-md text-sm">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-xs">{item.institution} | {item.year}</p>
                {item.gpa && <p className="text-gray-300 text-xs">{item.gpa}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Resume Button */}
        <div className="text-center mt-8">
          <a 
          target="_blank"
          rel="noopener noreferrer"
            href="https://drive.google.com/uc?export=download&id=1pZdajhLRtpm0HsyFV66sBfyxpGOWEaq1"
            download="Aravind_Bandipelli_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-md shadow-md transition duration-300"
          >
            <FiDownload className="text-lg" /> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
