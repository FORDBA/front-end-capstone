import React, { useState, useContext, useEffect, useRef } from "react"
import { EventContext } from "./EventProvider"
import "./Events.css"
import { AttendingEventContext } from "./AttendingEventsProvider"
import { UserContext } from "../user/UserProvider"
import { DungeonContext } from "../Dungeons/DungeonProvider"
import { BossContext } from "../Bosses/BossProvider"
import { NeededBossContext } from "../Bosses/NeededBossProvider"
import { TreasureContext } from "../Loot/TreasureProvider"




export const EventDetails = (props) => {
    const { getEvents, events, deleteEvent, getEventById } = useContext(EventContext)
    const { addAttendingEvent, attendingEvents, updateAttendingEvent, getAttendingEvents } = useContext(AttendingEventContext)
    const { users, getUsers } = useContext(UserContext)
    const { bosses, getBosses } = useContext(BossContext)
    const { neededBosses, getNeededBosses } = useContext(NeededBossContext)
    const { treasures, getTreasures } = useContext(TreasureContext)

    const [event, setEvent] = useState({ user: {}, dungeon: {} })
    const [attendingEvent, setAttendingEvent, needsEvent] = useState({})
    const attendingStatus = useRef()
    const editMode = props.match.params.hasOwnProperty("attendingEventId")

    useEffect(() => {
        const eventId = parseInt(props.match.params.eventId)
        getUsers().then(getEvents).then(getAttendingEvents)
        getEventById(eventId)
            .then(setEvent)
    }, [])
    useEffect(() => {
        getBosses()
        getNeededBosses()
        getTreasures()
    }, [])
    const getEventInEditMode = () => {
        if (editMode) {
            const attendingEventId = parseInt(props.match.params.attendingEventId)
            const selectedAttendingEvent = events.find(a => a.id === attendingEventId) || {}
            setEvent(selectedAttendingEvent)
        }
    }

    
    
    
    const checkUserNeed = (userId) => {
        
        
        const eventBosses = bosses.filter(boss => {

           return boss.dungeonId === event.dungeonId
        })

        const userNeeds = neededBosses.filter(nb => {
            return nb.userId === userId

        })
        const userTreasures = treasures.filter(t => {
           return t.userId === userId

        })
        const progNeed = userNeeds.some(un => un.bossId === eventBosses.id)
        const treasureNeed = userTreasures.some(ut => ut.bossId === eventBosses.id)


        if (progNeed === true || treasureNeed === true) {

           let needsEvent = true
           clickAttendingEvent()
        }
        else{ 
            let needsEvent = false
            clickAttendingEvent()
        }

        
        return needsEvent
        

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
                <div className="event__dungeon">{event.dungeon.name}</div>


                <div className="event__date">{event.date}</div>
                <div className="event__creator">{event.user.name}</div>
                <h2>Attending</h2>
                <button  onClick={() => checkUserNeed(parseInt(localStorage.getItem("guild_user")))} ref={attendingStatus} defaultValue="Attending">Click if Attending</button>
                <div className="attendingList">
                {
                    attendingEvents.map(attendingEvent => {
                        attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                        attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                        if (attendingEvent.status === "Attending" && attendingEvent.eventId === event.id) {
                            if (needsEvent === true) {
                                return (
                                    <div className="event__needed">{attendingEvent.users.name}</div>
                                )
                            } else {
                                return (
                                    <section className="attendingUser">
                                    <div className="event__notNeeded">{attendingEvent.users.name}</div>
                                    </section>
                                )
                            }

                        }
                    }
                    )
                }
                </div>
                <h2>Tentative</h2>
                <button onClick onClick={() => clickTentativeAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Tentative</button>
                <div className="attendingList">
                {
                    attendingEvents.map(attendingEvent => {
                        attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                        attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                        if (attendingEvent.status === "Tentative" && attendingEvent.eventId === event.id) {
                            if (needsEvent === true) {
                                return (
                                    
                                    <div className="event__needed">{attendingEvent.users.name}</div>
                                )
                            } else {
                                return (
                                    <section className="attendingUser">
                                    <div className="event__notNeeded">{attendingEvent.users.name}</div>
                                    </section>
                                )
                            }


                        }
                    }
                    )
                }
                </div>
                <h2>Not Attending</h2>
                <button onClick onClick={() => clickNotAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Unable to Attend</button>
                <div className="attendingList">
                {
                    attendingEvents.map(attendingEvent => {
                        attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                        attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                        if (attendingEvent.status === "Not Attending" && attendingEvent.eventId === event.id) {
                            return (
                                <section className="attendingUser">
                                <div>{attendingEvent.users.name}</div>
                                </section>
                            )

                        }
                    }
                    )
                }
                </div>



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
                <div className="event__creator">Created By:{event.user.name}</div>
                <h2>Attending</h2>
                <button onClick onClick={() => clickAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Attending</button>
                <div className="attendingList">
                {
                    attendingEvents.map(attendingEvent => {
                        attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                        attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                        if (attendingEvent.status === "Attending" && attendingEvent.eventId === event.id) {
                            return (
                                <section className="attendingUser">
                                <div >{attendingEvent.users.name}</div>
                                </section>
                            )

                        }
                    }
                    )
                }
                </div>
                <h2>Tentative</h2>
                <button onClick onClick={() => clickTentativeAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Tentative</button>
                <div className="attendingList">
                {
                    attendingEvents.map(attendingEvent => {
                        attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                        attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                        if (attendingEvent.status === "Tentative" && attendingEvent.eventId === event.id) {
                            return (
                                <section className="attendingUser">
                                <div>{attendingEvent.users.name}</div>
                                </section>
                            )

                        }
                    }
                    )
                }
                </div>
                <h2>Not Attending</h2>
                <button onClick onClick={() => clickNotAttendingEvent()} ref={attendingStatus} defaultValue="Attending">Click if Unable to Attend</button>
                <div className="attendingList">
                {
                    attendingEvents.map(attendingEvent => {
                        attendingEvent.users = users.find(u => u.id === attendingEvent.userId)
                        attendingEvent.events = events.find(e => e.id === attendingEvent.eventId)
                        if (attendingEvent.status === "Not Attending" && attendingEvent.eventId === event.id) {
                            return (
                                <section className="attendingUser">
                                <div >{attendingEvent.users.name}</div>
                                </section>
                            )

                        }
                    }
                    )
                }
                </div>




            </main>
        )

    }
}