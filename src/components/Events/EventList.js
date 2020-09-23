import React, { useState, useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { UserContext } from "../user/UserProvider"
import { AttendingEventContext } from "./AttendingEventsProvider"
import { Link } from "react-router-dom"
import "./Events.css"

export const EventList = (props, { history }) => {
    const { events, getEvents, searchTerms } = useContext(EventContext)
    const { attendingEvents, getAttendingEvents} = useContext(AttendingEventContext)
    const { users, getUsers } = useContext(UserContext)
    const [filteredEvents, setFiltered] = useState([])
    
    

    useEffect(() => {
        getUsers().then(getEvents).then(getAttendingEvents)
    }, [])
    useEffect(() => {
        const matchingEvents = events.filter(event => event.name.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(matchingEvents)
    }, [searchTerms])
    useEffect(() => {
        setFiltered(events)
    }, [events])

   let numberAttending = []
   let hiddenArray =[]
    

    return (
        <div>
            <h1>Events</h1>

            

            <article className="events__container">
            <button onClick={() => props.history.push("/events/createevent")}>
                Add Events
                </button>
               <div className="events" >
                {
                    filteredEvents.map(event => {
                        event.users = users.find(e => e.id === event.userId)
                        event.attendingEvents = attendingEvents.filter(a => a.eventId === event.id)
                        return <section className="event" key={event.id}>
                            <Link to={`/events/${event.id}`}>
                                <h3>{event.name}</h3>

                            </Link>
                                <div className="event__date">{event.date}</div>
                                <div className="event__creator">Created By: {event.users.name}</div>
                                
                                
                                
                                
                                
                        </section>
                    })
                }
                </div>
            </article>
        </div>
    )
}