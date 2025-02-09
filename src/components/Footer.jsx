export default function Footer() {
    return (
      <footer className="w-full text-center py-3 bg-gray-900 text-gray-400 text-xs">
        <p>© {new Date().getFullYear()} Aravind Bandipelli • All Rights Reserved | Designed & Built by Aravind Bandipelli</p>
        <p className="mt-1"></p>
        <p className="mt-1">Last updated: {new Date().toLocaleDateString()}</p>
  
        {/* CTA in One Line */}
        <p className="mt-2">
          Looking for a Data Science Intern? <a href="mailto:aravindbandipelli@gmail.com" className="text-blue-400 hover:text-blue-300">Email Me</a>
        </p>
      </footer>
    );
  }
  