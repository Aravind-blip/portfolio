import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaServer, FaCloud, FaDatabase, FaBrain, FaTools, FaChartBar, FaPython, FaAws, FaMicrosoft, FaGitAlt, FaJira, FaTrello, FaHtml5, FaCss3Alt, FaAngular, FaDotCircle, FaVial } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import { MdStorage } from 'react-icons/md';

// Skill Categories (Removed React & JavaScript, Added TypeScript)
const categories = {
    "Languages": {
        icon: <FaCode />,
        skills: [
            { name: "Python", icon: <FaPython color="#3776AB" /> },
            { name: "SQL", icon: <FaDatabase color="#A970FF" /> },
            { name: "C#", icon: <FaDotCircle color="#68217A" /> },
            { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> } // Added TypeScript
        ]
    },
    "Frontend Development": {
        icon: <FaLaptopCode />,
        skills: [
            { name: "Angular", icon: <FaAngular color="#DD0031" /> },
            { name: "HTML", icon: <FaHtml5 color="#E34F26" /> },
            { name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
            { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> } // Moved TypeScript here as well
        ]
    },
    "Backend Development": {
        icon: <FaServer />,
        skills: [
            { name: "ASP.NET Core", icon: <FaDotCircle color="#68217A" /> },
            { name: "Web API", icon: <FaDotCircle color="#68217A" /> },
            { name: "SQL Server", icon: <MdStorage color="#CC2927" /> },
            { name: "Entity Framework", icon: <FaDatabase color="#A970FF" /> }
        ]
    },
    "Data Analytics": {
        icon: <FaChartBar />,
        skills: [
            { name: "Tableau", icon: <FaChartBar color="#005F9E" /> },
            { name: "Power BI", icon: <FaChartBar color="#F2C811" /> },
            { name: "Excel", icon: <FaChartBar color="#007bff" /> }
        ]
    },
    "Cloud & DevOps": {
        icon: <FaCloud />,
        skills: [
            { name: "Azure", icon: <FaMicrosoft color="#0089D6" /> },
            { name: "AWS (S3, Lambda)", icon: <FaAws color="#FF9900" /> }
        ]
    },
    "Automation & Testing": {
        icon: <FaVial />,
        skills: [
            { name: "Selenium WebDriver (C#)", icon: <FaDotCircle color="#68217A" /> },
            { name: "Jira", icon: <FaJira color="#0052CC" /> },
            { name: "Trello", icon: <FaTrello color="#0079BF" /> }
        ]
    },
    "Version Control & Collaboration": {
        icon: <FaTools />,
        skills: [
            { name: "Git", icon: <FaGitAlt color="#F05032" /> },
            { name: "GitHub", icon: <FaGitAlt color="#F05032" /> },
            { name: "Scrum", icon: <FaTools color="#007bff" /> }
        ]
    }
};

const SkillsTabs = () => {
    const [activeTab, setActiveTab] = useState("Languages");

    return (
        <section className="skills-section">
            <h2 className="skills-title">Technical Skills</h2>

            {/* Tab Navigation with Unique Icons */}
            <div className="tab-buttons">
                {Object.keys(categories).map((category) => (
                    <motion.button
                        key={category}
                        className={`tab-button ${activeTab === category ? "active" : ""}`}
                        onClick={() => setActiveTab(category)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title={category} // Tooltip on hover
                    >
                        {categories[category].icon}
                    </motion.button>
                ))}
            </div>

            {/* Skills Grid with Motion Animation */}
            <motion.div 
                className="skills-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {categories[activeTab].skills.map((skill, index) => (
                    <motion.div 
                        key={index} 
                        className="skill-card"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="skill-icon">{skill.icon}</div>
                        <p className="skill-name">{skill.name}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default SkillsTabs;
