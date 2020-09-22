import React, { useState, useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { UserContext } from "../user/UserProvider"
import { Link } from "react-router-dom"
import "./Events.css"

export const EventList = (props, { history }) => {
    const { events, getEvents, searchTerms } = useContext(EventContext)
    const { users, getUsers } = useContext(UserContext)
    const [filteredEvents, setFiltered] = useState([])

    useEffect(() => {
        getUsers().then(getEvents)
    }, [])
    useEffect(() => {
        const matchingEvents = events.filter(event => event.name.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(matchingEvents)
    }, [searchTerms])
    useEffect(() => {
        setFiltered(events)
    }, [events])
    

    return (
        <div>
            <h1>Events</h1>

            

            <article className="events__container">
            <button onClick={() => history.push("/events/createevent")}>
                Add Events
                </button>
               <div className="events" >
                {
                    filteredEvents.map(event => {
                        event.users = users.find(e => e.id === event.userId)
                        return <section className="event" key={event.id}>
                            <Link to={`/events/${event.id}`}>
                                <h3>{event.name}</h3>

                            </Link>
                                <div className="event__date">{event.date}</div>
                                <div className="event__creator">Created By: {event.users.name}</div>
                                <button classname="attending">Attending</button>
                                <button classname="tentative">Tentative</button>
                                <button classname="notAttending">Not Attending</button>
                        </section>
                    })
                }
                </div>
            </article>
        </div>
    )
}