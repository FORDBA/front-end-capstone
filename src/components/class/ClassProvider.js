import React, { useState } from "react"


export const ClassContext = React.createContext()

export const ClassProvider = (props) => {
    const [classes, setClasses] = useState([])

    const getClasses = () => {
        return fetch("http://localhost:8088/classes")
            .then(res => res.json())
            .then(setClasses)
    }

    const addClass = c => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(c)
        })
            .then(getClasses)
    }

    
    
    return (
        <ClassContext.Provider value={{
            classes, getClasses, addClass
        }}>
            {props.children}
        </ClassContext.Provider>
    )
}