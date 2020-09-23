import React, { useState } from "react"


export const NeededBossContext = React.createContext()

export const NeededBossProvider = (props) => {
    const [neededBosses, setNeededBosses] = useState([])

    const getNeededBosses = () => {
        return fetch("http://localhost:8088/neededBosses")
            .then(res => res.json())
            .then(setNeededBosses)
    }

    const addNeededBoss = neededBoss => {
        return fetch("http://localhost:8088/neededBosses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(neededBoss)
        })
            .then(getNeededBosses)
    }

    const getNeededBossById = (id) => {
        return fetch(`http://localhost:8088/neededBosses/${id}?_expand=dungeon`)
            .then(res => res.json())
    }
    const deleteNeededBoss = (neededBossId) => {
        return fetch(`http://localhost:8088/bosses/${neededBossId}`, {
            method: "DELETE"
        })
            .then(getNeededBosses)
    }

    
    
    return (
        <NeededBossContext.Provider value={{
            neededBosses, getNeededBosses, addNeededBoss, getNeededBossById, deleteNeededBoss
        }}>
            {props.children}
        </NeededBossContext.Provider>
    )
}