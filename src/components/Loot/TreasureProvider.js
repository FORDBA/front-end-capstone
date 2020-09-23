import React, { useState } from "react"


export const TreasureContext = React.createContext()

export const TreasureProvider = (props) => {
    const [treasures, setTreasures] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getTreasures = () => {
        return fetch("http://localhost:8088/treasures")
            .then(res => res.json())
            .then(setTreasures)
    }
    const getTreasureById = (id) => {
        return fetch(`http://localhost:8088/treasures/${id}?_expand=user`)
            .then(res => res.json())
    }


    const addTreasure = treasure => {
        return fetch("http://localhost:8088/treasures", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(treasure)
        })
            .then(getTreasures)
    }
    const updateTreasure = treasure => {
        return fetch(`http://localhost:8088/treasures/${treasure.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(treasure)
        })
            .then(getTreasures)
    }
    const deleteTreasure = (treasureId) => {
        return fetch(`http://localhost:8088/treasures/${treasureId}`, {
            method: "DELETE"
        })
            .then(getTreasures)
    }

    return (
        <TreasureContext.Provider value={{
            treasures, getTreasures, addTreasure, getTreasureById,
            searchTerms, setTerms, deleteTreasure, updateTreasure
        }}>
            {props.children}
        </TreasureContext.Provider>
    )
}