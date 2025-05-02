import { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const muiTheme = theme === 'light' ? lightTheme : darkTheme;

  const toggleOffcanvas = () => setIsOpen(!isOpen);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, muiTheme , toggleOffcanvas , isOpen}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);