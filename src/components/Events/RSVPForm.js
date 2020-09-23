import React, { useContext, useState, useEffect, useRef } from "react"
import { EventContext } from "./Eventrovider"
import { AttendingEventContext } from "./AttendingEventProvider"

export const AttendingEventsForm = (props) => {
    const { events, getEvents } = useContext(EventContext)
    const { attendingEvents, addAttendingEvent, updateAttendingEvent, getAttendingEvent } = useContext(AttendingEventContext)

    const [attendingEvent, setAttendingEvent] = useState({})

    const editMode = props.match.params.hasOwnProperty("attendingEventId")
    const event = useRef()

    const eventId = parseInt(props.match.params.eventId)


    const getUserProfessionInEditMode = () => {
        if (editMode) {
            const attendingEventId = parseInt(props.match.params.attendingEventId)
            const selectedAttendingEvent = attendingEvent.find(a => a.id === attendingEventId) || {}
            setAttendingEvent(selectedAttendingEvent)
        }
    }


    useEffect(() => {
        getAttendingEvents()
        getEvents()
    }, [])


    useEffect(() => {
        getAttendingEventInEditMode()
    }, [attendingEvents])

    let i = 0
    const constructNewAttendingEvent = () => {
                                       
                
                
                if (parseInt(attendingEventId.value) === 0) {
                    window.alert("Select Attending Status")
                } else {
                    if (editMode) {
                        // PUT
                        updateAttendingEvent({
                            professionId: parseInt(professionId.value),
                            userId: parseInt(localStorage.getItem("guild_user"))
                        })
                        .then(() => props.history.push("/profile"))
                    } else {
                        debugger
                        // POST
                        addAttendingEvent({
                            status: attendingEvent.value,
                            eventId: eventId,
                            userId: parseInt(localStorage.getItem("guild_user"))
                        })
                        .then(() => props.history.push("/profile"))
                    }
                
            
        }
        
        
        
    }

    return (
        <form className="attendingForm">
            <h2 className="attendingForm__title">{editMode ? "Update RSVP" : "RSVP"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="professions">RSVP: </label>
                    <select defaultValue="" name="race" ref={attendingEvent} id="userRace" className="form-control" >

                        <option value="0">Select RSVP</option>
                        <option value="Attending">Attending</option>
                        <option value="Tentative">Tentative</option>
                        <option value="Not Attending">Not Attending</option>
                            
                        ))
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewUserProfession()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Add Professions"}
            </button>
        </form>

    )

}