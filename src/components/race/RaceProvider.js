import React, { useState } from "react"


export const RaceContext = React.createContext()

export const RaceProvider = (props) => {
    const [races, setRaces] = useState([])

    const getRaces = () => {
        return fetch("http://localhost:8088/races")
            .then(res => res.json())
            .then(setRaces)
    }

    const addRace = race => {
        return fetch("http://localhost:8088/races", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(race)
        })
            .then(getRaces)
    }

    
    
    return (
        <RaceContext.Provider value={{
            races, getRaces, addRace
        }}>
            {props.children}
        </RaceContext.Provider>
    )
}