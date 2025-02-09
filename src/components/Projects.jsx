import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiX } from "react-icons/fi";

// Updated Projects List with Full Details from Resume
const projects = [
  {
    title: "GTFS Process and Approval Management Application",
    company: "Infosys",
    type: "Realtime",
    description: "Developed a full-stack financial automation web application on Azure, reducing manual workload by 900+ hours per year.",
    details: "Built and deployed a cloud-based application for financial operations using Angular and .NET Core, significantly improving efficiency and accuracy. Implemented workflow automation, access control, and data security policies to streamline financial processes.",
    impact: "✅ Reduced manual approval processing time by 75%.\n✅ Automated financial workflows, improving accuracy and transparency.\n✅ Improved user experience with an interactive dashboard for real-time tracking.",
    tech: ["Angular", ".NET Core", "Azure Synapse", "SQL"],
    github: "https://github.com/yourproject",
    demo: "" 
  },
  {
    title: "Characterizing and Predicting Early Reviewers for Product Marketing",
    company: "University Research",
    type: "Research",
    description: "Developed a machine learning model to predict early reviewers' behavior for targeted product marketing.",
    details: "Used sentiment analysis and Naïve Bayes to analyze customer reviews and predict purchasing behavior. The model helps businesses optimize early product adoption strategies.",
    impact: "✅ Achieved 79% accuracy in early reviewer predictions.\n✅ Helped businesses improve customer retention and marketing effectiveness.\n✅ Optimized feature engineering using NLP techniques.",
    tech: ["Python", "Naïve Bayes", "NLP", "Scikit-learn"],
    github: "https://github.com/yourproject",
    demo: "" 
  },
  {
    title: "Titanic Survival Prediction",
    company: "Personal",
    type: "Machine Learning",
    description: "Built a classification model using logistic regression to predict passenger survival with 87% accuracy.",
    details: "Developed an ML model trained on Titanic dataset to classify survival chances based on key passenger attributes like age, fare, and class.",
    impact: "✅ Achieved 87% model accuracy.\n✅ Used feature selection techniques to improve classification performance.\n✅ Gained hands-on experience in dataset preprocessing and model evaluation.",
    tech: ["Python", "Pandas", "Scikit-learn"],
    github: "https://github.com/yourproject",
    demo: "" 
  },
  {
    title: "Customer Segmentation Analysis",
    company: "Internship",
    type: "Data Analytics",
    description: "Performed data-driven customer segmentation for targeted marketing strategies using machine learning.",
    details: "Implemented K-Means clustering on customer behavioral data to segment users into meaningful groups, optimizing marketing strategies.",
    impact: "✅ Improved marketing campaign ROI by 30%.\n✅ Identified high-value customers using unsupervised learning.\n✅ Designed actionable insights through interactive data visualization.",
    tech: ["Python", "K-Means Clustering", "Seaborn"],
    github: "https://github.com/yourproject",
    demo: "https://yourlivedemo.com"
  },
  {
    title: "Sales Forecasting with Time Series",
    company: "Personal",
    type: "Machine Learning",
    description: "Created time-series forecasting models to predict retail sales trends using Python.",
    details: "Developed a predictive model using Statsmodels and Pandas to forecast sales data trends. Applied ARIMA and Exponential Smoothing techniques for time-series predictions.",
    impact: "✅ Improved forecasting accuracy by 20% compared to previous models.\n✅ Used seasonal decomposition techniques to analyze trend fluctuations.\n✅ Created visual reports for business decision-making.",
    tech: ["Python", "Statsmodels", "Pandas"],
    github: "https://github.com/yourproject",
    demo: "" 
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">🚀 Featured Projects</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Company & Project Type (Top-Left) */}
              <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-md">
                {project.company} | {project.type}
              </div>

              <h3 className="text-2xl font-bold mb-4 mt-6">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide-In Panel for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full md:w-96 h-full bg-gray-900 text-white shadow-lg z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{selectedProject.title}</h3>
              <button onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-600 text-white p-2 rounded-full shadow-md transition duration-300 transform hover:scale-110 hover:shadow-gray-500">
                <FiX className="text-xl" />
              </button>
            </div>

            <p className="text-gray-300 mt-4">{selectedProject.details}</p>

            <h4 className="text-lg font-semibold mt-6">📌 Impact</h4>
            <pre className="text-gray-400 whitespace-pre-wrap">{selectedProject.impact}</pre>

            <div className="flex gap-4 mt-6">
              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                <FiGithub /> GitHub
              </a>
              {selectedProject.demo && (
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="text-green-400">
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
