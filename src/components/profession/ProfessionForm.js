import React, { useContext, useState, useEffect, useRef } from "react"
import { ProfessionContext } from "./ProfessionProvider"
import { UserProfessionContext } from "./UserProfessionProvider"

export const ProfessionForm = (props) => {
    const { professions, getProfessions } = useContext(ProfessionContext)
    const { userProfessions, addUserProfession, updateUserProfession, getUserProfessions } = useContext(UserProfessionContext)

    const [userProfession, setUserProfession] = useState({})

    const editMode = props.match.params.hasOwnProperty("userProfessionId")
    const profession = useRef()




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
        const selectedProfessions = Array.from(profession.current.selectedOptions)
        if (selectedProfessions.length === 2  ){

            selectedProfessions.map(professionId=> { 
                
                
                
                if (parseInt(professionId.value) === 0) {
                    window.alert("Please select two professions")
                } else {
                    if (editMode) {
                        // PUT
                        updateUserProfession({
                            professionId: parseInt(professionId.value),
                            userId: parseInt(localStorage.getItem("guild_user"))
                        })
                        .then(() => props.history.push("/profile"))
                    } else {
                        debugger
                        // POST
                        addUserProfession({
                            professionId: parseInt(professionId.value),
                            userId: parseInt(localStorage.getItem("guild_user"))
                        })
                        .then(() => props.history.push("/profile"))
                    }
                }
            } )
        }
        else {window.alert("You must select two Professions")}
        
        
    }

    return (
        <form className="professionForm">
            <h2 className="professionForm__title">{editMode ? "Update Professions" : "Add Professions"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="professions">Professions: </label>
                    <select multiple={true} defaultValue="" name="race" ref={profession} id="userRace" className="form-control" >

                        <option value="0">Select Professions</option>
                        {professions.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
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