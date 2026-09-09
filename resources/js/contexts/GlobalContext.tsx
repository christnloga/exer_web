import { createContext, useState, useContext } from 'react';

interface GlobalContextValue {
    navbarLight: boolean;
    setNavbarLight: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextValue | null>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [navbarLight, setNavbarLight] = useState(false);

    return (
        <GlobalContext.Provider value={{ navbarLight, setNavbarLight }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = (): GlobalContextValue => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};
