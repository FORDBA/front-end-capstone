import React, { useState } from "react"


export const AttendingEventContext = React.createContext()

export const AttendingEventProvider = (props) => {
    const [attendingEvents, setAttendingEvents] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getAttendingEvents = () => {
        return fetch("http://localhost:8088/attendingEvents")
            .then(res => res.json())
            .then(setAttendingEvents)
    }
    const getAttendingEventById = (id) => {
        return fetch(`http://localhost:8088/attendingEvents/${id}?_expand=user`)
            .then(res => res.json())
    }


    const addAttendingEvent = attendingEvent => {
        return fetch("http://localhost:8088/attendingEvents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attendingEvent)
        })
            .then(getAttendingEvents)
    }
    const updateAttendingEvent = attendingEvent => {
        return fetch(`http://localhost:8088/attendingEvents/${attendingEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attendingEvent)
        })
            .then(getAttendingEvents)
    }
    const deleteAttendingEvent = (attendingEventId) => {
        return fetch(`http://localhost:8088/attendingEvents/${attendingEventId}`, {
            method: "DELETE"
        })
            .then(getAttendingEvents)
    }

    

    
    
    return (
        <AttendingEventContext.Provider value={{
            attendingEvents, getAttendingEvents, addAttendingEvent, getAttendingEventById,
            searchTerms, setTerms, deleteAttendingEvent, updateAttendingEvent
        }}>
            {props.children}
        </AttendingEventContext.Provider>
    )
}