/* eslint-disable react-refresh/only-export-components */
import React, {createContext, useState, useEffect, type ReactNode} from "react";

export type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme:'light',
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || 'light';
    })

const toggleTheme = () => {
    setTheme((prev) => prev === 'light' ? 'dark' : 'light');
}

useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme)
}, [theme]);

return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
);
}