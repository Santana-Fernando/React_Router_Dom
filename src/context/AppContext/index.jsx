//-------------------------------------------------------- useContext --------------------------------------------------------------
import React, { createContext, useState } from "react";
import { globalState } from "./data";

export const GlobalContext = createContext();

export const AppContext = ({children}) => {
    const [globalContextState, setContextState] = useState(globalState)

    return <GlobalContext.Provider value={{ globalContextState, setContextState}}>{children}</GlobalContext.Provider>
}