import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Prevents Redirect)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("https://formspree.io/f/xpwqlkra", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // Clear form fields
      setTimeout(() => setIsSubmitted(false), 3000); // Hide success message after 3s
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">📩 Get in Touch</h2>
        <p className="text-gray-400 mb-8">
          Feel free to reach out for collaborations, job opportunities, or any inquiries!
        </p>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
          onSubmit={handleSubmit}
        >
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            rows="4" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
          ></textarea>
          
          <div className="relative">
            {/* Send Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md shadow-md transition duration-300"
            >
              <FiSend className="text-lg" /> Send Message
            </button>

            {/* Success Message (Glowing Effect) */}
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 10 }} 
                className="absolute right-[-160px] top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg text-sm flex items-center gap-2 animate-pulse"
              >
                <FiCheckCircle className="text-lg" /> Message Sent!
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
