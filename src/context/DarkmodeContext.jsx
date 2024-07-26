import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { NAME_OF_SESSIONSTORAGE } from "../utils/Constant";

export const DarkModeContext = createContext();

function DarkModeProvider(info) {
    const { children } = info

    const [IsDark, setMode] = useLocalStorageState();

    useEffect(
        function () {
            if (IsDark) {
                document.documentElement.classList.add("dark-mode");
                document.documentElement.classList.remove("light-mode");
            } else {
                document.documentElement.classList.add("light-mode");
                document.documentElement.classList.remove("dark-mode");
            }
        },
        [IsDark]
    );

    function toggleDarkMode() {
        setMode((isDark) => !isDark);
        localStorage.setItem(NAME_OF_SESSIONSTORAGE, !IsDark)
    }

    return (
        <DarkModeContext.Provider value={{ IsDark, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export { DarkModeProvider };
