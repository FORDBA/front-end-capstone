import React, { useState } from "react"


export const RoleContext = React.createContext()

export const RoleProvider = (props) => {
    const [roles, setRoles] = useState([])

    const getRoles = () => {
        return fetch("http://localhost:8088/roles")
            .then(res => res.json())
            .then(setRoles)
    }

    const addRole = role => {
        return fetch("http://localhost:8088/roles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(role)
        })
            .then(getRoles)
    }

    
    
    return (
        <RoleContext.Provider value={{
            roles, getRoles, addRole
        }}>
            {props.children}
        </RoleContext.Provider>
    )
}