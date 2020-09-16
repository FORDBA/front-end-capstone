import React, { useContext, useState, useEffect, useRef } from "react"
import { ProfessionContext } from "./ProfessionProvider"
import { UserProfessionContext } from "./UserProfessionProvider"

export const ProfessionForm = (props) => {
    const { professions, getProfessions } = useContext(ProfessionContext)
    const { userProfessions, addUserProfession, updateUserProfession, getUserProfessions } = useContext(UserProfessionContext)

    const [userProfession, setUserProfession] = useState({})

    const editMode = props.match.params.hasOwnProperty("userProfessionId")
    const profession = useRef() 

    const handleControlledInputChange = (event) => {
       
        const newUserProfession = Object.assign({}, userProfession)          // Create copy
        newUserProfession[event.target.name] = event.target.value    // Modify copy
        setUserProfession(newUserProfession)                                 // Set copy as new state
    }

    
    const getUserProfessionInEditMode = () => {
        if (editMode) {
            const userProfessionId = parseInt(props.match.params.userProfessionId)
            const selectedUserProfession = userProfessions.find(a => a.id === userProfessionId) || {}
            setUserProfession(selectedUserProfession)
        }
    }

   
    useEffect(() => {
        getUserProfessions()
        getProfessions()
    }, [])

    
    useEffect(() => {
        getUserProfessionInEditMode()
    }, [userProfessions])

    let i = 0
    const constructNewUserProfession = () => {
        if (i <2) {
        const professionId = parseInt(profession.current.value)

        if (professionId === 0) {
            window.alert("Please select a profession")
        } else {
            if (editMode) {
                // PUT
                updateUserProfession({
                    professionId: professionId,
                    userId: parseInt(localStorage.getItem("guild_user"))
                })
                    .then(() => props.history.push("/"))
            } else {
                // POST
                addUserProfession({
                    professionId: professionId,
                    customerId: parseInt(localStorage.getItem("guild_user"))
                })
                    .then(() => props.history.push("/"))
            }
        }
    }
else {
    window.alert("You can only have two professions.")
}}

    return (
        <form className="professionForm">
            <h2 className="professionForm__title">{editMode ? "Update Professions" : "Add Professions"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="professions">Professions: </label>
                    <select defaultValue="" name="race" ref={profession} id="userRace" className="form-control" >
                   
                        <option value="0">Select Professions</option>
                        {professions.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => {
                constructNewUserProfession()
                i += 1
            }}>Add</button>
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewUserProfession()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Make Reservation"}
            </button>
        </form>
    
    )

}