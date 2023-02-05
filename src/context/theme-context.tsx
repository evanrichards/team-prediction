import React from 'react';
import { useCookies } from 'react-cookie';

export const ThemeContext = React.createContext({
  currentTheme: 'macchiato',
  setTheme: (_: string) => {
    return;
  },
});
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookieTheme, setCookieTheme] = useCookies(['theme']);
  return (
    <ThemeContext.Provider
      value={{
        currentTheme: cookieTheme.theme ?? 'macchiato',
        setTheme: (theme: string) => setCookieTheme('theme', theme),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
