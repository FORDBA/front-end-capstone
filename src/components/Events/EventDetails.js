import React, { useState, useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import "./Events.css"




export const EventDetails = ( props ) => {
    const { getEvents, events, deleteEvent, getEventById } = useContext(EventContext)
    

    const [event, setEvent] = useState({ user: {} })

    useEffect(() => {
        const eventId = parseInt(props.match.params.eventId)
        getEventById(eventId)
        .then(setEvent)
    }, [])

    


    
 
    return (
        <main className="eventContainer">
            
            <h1 className="event__name">{event.name}</h1>

            
            <div className="event__date">{event.date}</div>
            <div className="event__creator">{event.user.name}</div>
            <h2>Attending</h2>
            <h2>Tentative</h2>
            <h2>Not Attending</h2>
            
            

            <button onClick={() => deleteEvent(event.id).then(() => props.history.push("/events"))} >Delete Event</button>
            <button onClick={() => {
                props.history.push(`/events/edit/${event.id}`)
            }}>Edit</button>
        </main>
    )
}