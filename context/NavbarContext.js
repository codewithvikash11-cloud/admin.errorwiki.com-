"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const NavbarContext = createContext({
    centerContent: null,
    setCenterContent: () => { },
    customActions: null,
    setCustomActions: () => { },
    resetNavbar: () => { },
    hideSearch: false,
    setHideSearch: () => { },
    hideLinks: false,
    setHideLinks: () => { }
});

export const NavbarProvider = ({ children }) => {
    const [centerContent, setCenterContent] = useState(null);
    const [customActions, setCustomActions] = useState(null);
    const [hideSearch, setHideSearch] = useState(false);
    const [hideLinks, setHideLinks] = useState(false);

    const resetNavbar = () => {
        setCenterContent(null);
        setCustomActions(null);
        setHideSearch(false);
        setHideLinks(false);
    };

    return (
        <NavbarContext.Provider value={{
            centerContent,
            setCenterContent,
            customActions,
            setCustomActions,
            resetNavbar,
            hideSearch,
            setHideSearch,
            hideLinks,
            setHideLinks
        }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => useContext(NavbarContext);
