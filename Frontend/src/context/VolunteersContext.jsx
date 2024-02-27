import { useState,createContext } from "react";


export const VolunteersContext = createContext();

export const VolunteerContextProvider = props => {
    const [volunteers, setVolunteers] =useState([]);

    return (
        <VolunteersContext.Provider value={{volunteers, setVolunteers}}>
            {props.children}
        </VolunteersContext.Provider>
    )
}
