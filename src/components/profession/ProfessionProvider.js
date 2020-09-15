import React, { useState } from "react"


export const ProfessionContext = React.createContext()

export const ProfessionProvider = (props) => {
    const [professions, setProfessions] = useState([])

    const getProfessions = () => {
        return fetch("http://localhost:8088/professions")
            .then(res => res.json())
            .then(setProfessions)
    }

    const addProfession = profession => {
        return fetch("http://localhost:8088/professions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profession)
        })
            .then(getProfessions)
    }

    
    
    return (
        <ProfessionContext.Provider value={{
            professions, getProfessions, addProfession
        }}>
            {props.children}
        </ProfessionContext.Provider>
    )
}