import React, { useState } from "react"


export const BossContext = React.createContext()

export const BossProvider = (props) => {
    const [bosses, setBosses] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getBosses = () => {
        return fetch("http://localhost:8088/bosses")
            .then(res => res.json())
            .then(setBosses)
    }
    const getBossById = (id) => {
        return fetch(`http://localhost:8088/bosses/${id}?_expand=dungeon`)
            .then(res => res.json())
    }


    const addBoss = boss => {
        return fetch("http://localhost:8088/bosses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boss)
        })
            .then(getBosses)
    }
    const updateBoss = boss => {
        return fetch(`http://localhost:8088/bosses/${boss.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boss)
        })
            .then(getBosses)
    }
    const deleteBoss = (bossId) => {
        return fetch(`http://localhost:8088/bosses/${bossId}`, {
            method: "DELETE"
        })
            .then(getBosses)
    }

    

    
    
    return (
        <BossContext.Provider value={{
            bosses, getBosses, addBoss, getBossById,
            searchTerms, setTerms, deleteBoss, updateBoss
        }}>
            {props.children}
        </BossContext.Provider>
    )
}