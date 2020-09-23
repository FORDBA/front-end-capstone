import React, { useRef, useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { UserContext } from "../user/UserProvider"
import "./Events.css"


export const EventForm = (props) => {
    
    const { addEvent, events, updateEvent, getEvents } = useContext(EventContext)
    

   
    const [event, setEvent] = useState({})
    const eventDate = useRef()
  

    
    const editMode = props.match.params.hasOwnProperty("eventId")  

    const handleControlledInputChange = (e) => {
       
        const newEvent = Object.assign({}, event)          
        newEvent[e.target.name] = e.target.value    
        setEvent(newEvent)                                 
    }

    
    const getEventInEditMode = () => {
        if (editMode) {
            const eventId = parseInt(props.match.params.eventId)
            const selectedEvent = events.find(a => a.id === eventId) || {}
            setEvent(selectedEvent)
        }
    }

    
    useEffect(() => {
        getEvents()
         }, [])

    
    useEffect(() => {
        getEventInEditMode()
    }, [events])


    const constructNewEvent = () => {
        

        
            if (editMode) {
                
                updateEvent({
                    id: event.id,
                    name: event.name,
                    date: eventDate.current.value,
                    userId: parseInt(localStorage.getItem("guild_user"))
                    
                })
                    .then(() => props.history.push("/events"))
            } else {
                
                addEvent({
                    name: event.name,
                    date: eventDate.current.value,
                    userId: parseInt(localStorage.getItem("guild_user"))
                    
                })
                    .then(() => props.history.push("/events"))
            }
        
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">{editMode ? "Update Boss" : "Add Boss"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Event Name"
                        defaultValue={event.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                    <label htmlFor="eventDate"> Add Date </label>
                    <input ref={eventDate} type="date"
                        name="eventDate"
                        className="form-control"
                        required 
                        onChange={handleControlledInputChange}
                        />
                </fieldset>
                
            
            
                
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEvent()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Save"}
            </button>
        </form>
    )
}