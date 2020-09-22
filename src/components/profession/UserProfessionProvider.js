import React, { useState } from "react"


export const UserProfessionContext = React.createContext()

export const UserProfessionProvider = (props) => {
    const [userProfessions, setUserProfessions] = useState([])

    const getUserProfessions = () => {
        return fetch("http://localhost:8088/userProfessions")
            .then(res => res.json())
            .then(setUserProfessions)
    }

    const addUserProfession = userProfession => {
        return fetch("http://localhost:8088/userProfessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userProfession)
        })
            .then(getUserProfessions)
    }

    const getUserProfessionById = (id) => {
        return fetch(`http://localhost:8088/userProfessions/${id}?_expand=user&_expand=profession`)
            .then(res => res.json())
    }

    
    
    return (
        <UserProfessionContext.Provider value={{
            userProfessions, getUserProfessions, addUserProfession, getUserProfessionById
        }}>
            {props.children}
        </UserProfessionContext.Provider>
    )
}