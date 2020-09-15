import React, { useState } from "react"


export const RankContext = React.createContext()

export const RankProvider = (props) => {
    const [ranks, setRanks] = useState([])

    const getRanks = () => {
        return fetch("http://localhost:8088/ranks")
            .then(res => res.json())
            .then(setRanks)
    }

    const addRank = rank => {
        return fetch("http://localhost:8088/ranks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rank)
        })
            .then(getRanks)
    }

    
    
    return (
        <RankContext.Provider value={{
            ranks, getRanks, addRank
        }}>
            {props.children}
        </RankContext.Provider>
    )
}