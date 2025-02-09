import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 p-3 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg"
    >
      {isDark ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
    </button>
  );
}