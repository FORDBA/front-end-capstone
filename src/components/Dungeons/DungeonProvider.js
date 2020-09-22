import React, { useState } from "react"


export const DungeonContext = React.createContext()

export const DungeonProvider = (props) => {
    const [dungeons, setDungeons] = useState([])

    const getDungeons = () => {
        return fetch("http://localhost:8088/dungeons")
            .then(res => res.json())
            .then(setDungeons)
    }

    const addDungeon = Dungeon => {
        return fetch("http://localhost:8088/dungeons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Dungeon)
        })
            .then(getDungeons)
    }

    
    
    return (
        <DungeonContext.Provider value={{
            dungeons, getDungeons, addDungeon
        }}>
            {props.children}
        </DungeonContext.Provider>
    )
}