import React, { createContext, useContext, useState } from "react";


export const ThemContext = createContext();


export const useThemContext = () => {
    return useContext(ThemContext);
}


export const ThemContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }
    return (
    <ThemContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemContext.Provider>
    )
}
