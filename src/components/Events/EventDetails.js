import React, { useState, useContext, useEffect, useRef } from "react"
import { EventContext } from "./EventProvider"
import "./Events.css"
import { AttendingEventContext } from "./AttendingEventsProvider"
import { UserContext } from "../user/UserProvider"




export const EventDetails = ( props ) => {
    const { getEvents, events, deleteEvent, getEventById } = useContext(EventContext)
    const { addAttendingEvent, attendingEvents, updateAttendingEvent, getAttendingEvents } = useContext(AttendingEventContext)
    const { users, getUsers } = useContext(UserContext)
    

    const [event, setEvent] = useState({ user: {} })
    const [attendingEvent, setAttendingEvent] = useState({})
    const attendingStatus = useRef()
    const editMode = props.match.params.hasOwnProperty("attendingEventId")

    useEffect(() => {
        const eventId = parseInt(props.match.params.eventId)
        getUsers().then(getEvents).then(getAttendingEvents)
        getEventById(eventId)
        .then(setEvent)
    }, [])
    const getEventInEditMode = () => {
        if (editMode) {
            const attendingEventId = parseInt(props.match.params.attendingEventId)
            const selectedAttendingEvent = events.find(a => a.id === attendingEventId) || {}
            setEvent(selectedAttendingEvent)
        }
    }

    const clickAttendingEvent = () => {
        

        
        if (editMode) {
            
            updateAttendingEvent({
                id: attendingEvent.id,
                eventId: event.id,
                status: "Attending",
                userId: parseInt(localStorage.getItem("guild_user"))
                
            })
                .then(() => props.history.push(`/events/${event.id}`))
        } else {
            
            addAttendingEvent({
                eventId: event.id,
                status: "Attending",
                userId: parseInt(localStorage.getItem("guild_user"))
                
            })
                .then(() => props.history.push(`/events/${event.id}`))
        }
    
}

const clickNotAttendingEvent = () => {
        

        
    if (editMode) {
        
        updateAttendingEvent({
            id: attendingEvent.id,
            eventId: event.id,
            status: "Not Attending",
            userId: parseInt(localStorage.getItem("guild_user"))
            
        })
            .then(() => props.history.push(`/events/${event.id}`))
    } else {
        
        addAttendingEvent({
            eventId: event.id,
            status: "Not Attending",
            userId: parseInt(localStorage.getItem("guild_user"))
            
        })
            .then(() => props.history.push(`/events/${event.id}`))
    }

}

const clickTentativeAttendingEvent = () => {
        

        
    if (editMode) {
        
        updateAttendingEvent({
            id: attendingEvent.id,
            eventId: event.id,
            status: "Tentative",
            userId: parseInt(localStorage.getItem("guild_user"))
            
        })
            .then(() => props.history.push(`/events/${event.id}`))
    } else {
        
        addAttendingEvent({
            eventId: event.id,
            status: "Tentative",
            userId: parseInt(localStorage.getItem("guild_user"))
            
        })
            .then(() => props.history.push(`/events/${event.id}`))
    }

}


    
 if (parseInt(localStorage.getItem("guild_user")) === event.userId) {
    return (
        <main className="eventContainer">
            
            <h1 className="event__name">{event.name}</h1>

            
            <div className="event__date">{event.date}</div>
            <div className="event__creator">{event.user.name}</div>
            <h2>Attending</h2>
            <button onClick onClick={() => clickAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Attending</button> 
            {
                attendingEvents.map(attendingEvent => {
                    attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                    attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                    if(attendingEvent.status === "Attending"){
                        return (
                            <div>{attendingEvent.users.name}</div>
                        )

                    }
                  }
                )
            }
            <h2>Tentative</h2>
            <button onClick onClick={() => clickTentativeAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Tentative</button>
            {
                attendingEvents.map(attendingEvent => {
                    attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                    attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                    if(attendingEvent.status === "Tentative" && attendingEvent.eventId === event.id){
                        return (
                            <div>{attendingEvent.users.name}</div>
                        )

                    }
                  }
                )
            }
            <h2>Not Attending</h2>
            <button onClick onClick={() => clickNotAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Unable to Attend</button>
            {
                attendingEvents.map(attendingEvent => {
                    attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                    attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                    if(attendingEvent.status === "Not Attending" && attendingEvent.eventId === event.id){
                        return (
                            <div>{attendingEvent.users.name}</div>
                        )

                    }
                  }
                )
            }
            
            

            <button onClick={() => deleteEvent(event.id).then(() => props.history.push("/events"))} >Delete Event</button>
            <button onClick={() => {
                props.history.push(`/events/edit/${event.id}`)
            }}>Edit</button>
        </main>
    )
        }
        else {
            return (
            <main className="eventContainer">
            
            <h1 className="event__name">{event.name}</h1>

            
            <div className="event__date">{event.date}</div>
            <div className="event__creator">{event.user.name}</div>
            <h2>Attending</h2>
            <button onClick onClick={() => clickAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Attending</button> 
            {
                attendingEvents.map(attendingEvent => {
                    attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                    attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                    if(attendingEvent.status === "Attending" && attendingEvent.eventId === event.id){
                        return (
                            <div>{attendingEvent.users.name}</div>
                        )

                    }
                  }
                )
            }
            <h2>Tentative</h2>
            <button onClick onClick={() => clickTentativeAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Tentative</button>
            {
                attendingEvents.map(attendingEvent => {
                    attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                    attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                    if(attendingEvent.status === "Tentative" && attendingEvent.eventId === event.id){
                        return (
                            <div>{attendingEvent.users.name}</div>
                        )

                    }
                  }
                )
            }
            <h2>Not Attending</h2>
            <button onClick onClick={() => clickNotAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Unable to Attend</button>
            {
                attendingEvents.map(attendingEvent => {
                    attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                    attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                    if(attendingEvent.status === "Not Attending" && attendingEvent.eventId === event.id){
                        return (
                            <div>{attendingEvent.users.name}</div>
                        )

                    }
                  }
                )
            }
            
            

            
        </main>
            )

        }
}