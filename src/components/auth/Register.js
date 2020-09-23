import React, { useRef, useContext, useEffect, useState } from "react"
import "./Login.css"
import { RankContext } from "../rank/RankProvider"
import { RoleContext } from "../role/RoleProvider"
import { RaceContext } from "../race/RaceProvider"
import { ClassContext } from "../class/ClassProvider"
import { UserContext } from "../user/UserProvider"

export const Register = (props) => {
    const { ranks, getRanks } = useContext(RankContext)
    const { roles, getRoles } = useContext(RoleContext)
    const { races, getRaces } = useContext(RaceContext)
    const { classes, getClasses } = useContext(ClassContext)
    const { users, updateUser, getUsers } = useContext(UserContext)
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const rank = useRef()
    const role = useRef()
    const userClass = useRef()
    const race = useRef()
    const userSummary = useRef()
    const [user, setUser] = useState({})
    const editMode = props.match.params.hasOwnProperty("userId")  

    useEffect(() => {
        getRanks()
        getRoles()
        getRaces()
        getClasses()

       
    }, [])
    useEffect(() => {
        getUserInEditMode()
    }, [users])

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?name=${username.current.value}`)
            .then(_ => _.json())
            .then(user => !!user.length)
    }
    const getUserInEditMode = () => {
        if (editMode) {
            const userId = parseInt(localStorage.getItem("guild_user"))
            const selectedUser = users.find(a => a.id === userId) || {}
            setUser(selectedUser)
        }
    }
    const handleControlledInputChange = (event) => {
       
        const newUser = Object.assign({}, user)          
        newUser[event.target.name] = event.target.value    
        setUser(newUser)                                 
    }
    const handleRegister = () => {
        
        const rankId = parseInt(rank.current.value)
        const roleId = parseInt(role.current.value)
        const raceId = parseInt(race.current.value)
        const classId = parseInt(userClass.current.value)

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
                    if (editMode) {
                        updateUser({
                            id: parseInt(localStorage.getItem("guild_user")),
                            name: username.current.value,
                            password: password.current.value,
                            rankId: rankId,
                            roleId: roleId,
                            classId: classId,
                            raceId: raceId,
                            photo: image,
                            summary: userSummary.current.value

                        })
                        .then(() => props.history.push("/profile"))
                    }
                    else{
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: username.current.value,
                            password: password.current.value,
                            rankId: rankId,
                            roleId: roleId,
                            classId: classId,
                            raceId: raceId,
                            photo: image,
                            summary: userSummary.current.value
                            
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("guild_user", createdUser.id)
                                props.history.push("/profile")
                            }
                        })
                    }
                })
        } else {
            passwordDialog.csurrent.showModal()
        }
    }
    
    const [loading,setLoading] = useState(false)
    const [image,setImage] = useState("")
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset','wgwpr9x3')
        setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/dbdxcl9wd/image/upload",
        {
            method: 'POST',
            body:data
        })
        const file = await res.json()
        console.log(file)

        setImage(file.secure_url)
        setLoading(false)


    }
    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" >
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Dragon Slayer</h1>
                
                <fieldset>
                    <label htmlFor="inputUserName"> Character Name </label>
                    <input ref={username} type="userName" onChange={handleControlledInputChange}
                        name="UserName"
                        className="form-control"
                        placeholder="Username"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" onChange={handleControlledInputChange}
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" onChange={handleControlledInputChange}
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="userPhoto"> Add Photo </label>
                    <div><input type="file" 
                        name="userPhoto"
                        className="form-control"
                        required 
                        onChange={uploadImage}
                        />

                        {
                            loading?(
                                <div>Loading...</div>
                            ): (
                                <img src={image} />
                            )
                        }
                        </div>
                </fieldset>



                <fieldset>
                <div className="form-group">
                    <label htmlFor="rank">Guild Rank: </label>
                    <select defaultValue="" name="rank" ref={rank} id="userRank" className="form-control" onChange={handleControlledInputChange} >
                        <option value="0">Select a Rank</option>
                        {ranks.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="role">Role: </label>
                    <select defaultValue="" name="role" ref={role} id="userRole" className="form-control" onChange={handleControlledInputChange} >
                        <option value="0">Select a Role</option>
                        {roles.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="race">Race: </label>
                    <select defaultValue="" name="race" ref={race} onChange={handleControlledInputChange} id="userRace" className="form-control" >
                        <option value="0">Select a Rank</option>
                        {races.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="class">Class: </label>
                    <select defaultValue="" name="class" ref={userClass} onChange={handleControlledInputChange} id="userClass" className="form-control" >
                        <option value="0">Select a Class</option>
                        {classes.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>




                <fieldset>
                    <label htmlFor="userSummary"> Summary </label>
                    <textarea ref={userSummary} onChange={handleControlledInputChange} type="userSummary"
                        name="userSummary"
                        className="form-control"
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit"
                    onClick={e => {
                        e.preventDefault()
                        handleRegister()
                    }}>
                        Save Profile
                    </button>
                </fieldset>
            </form>
        </main>
    )
}