import React, { useRef, useContext, useEffect } from "react"
import "./Login.css"
import { RankContext } from "../rank/RankProvider"
import { RoleContext } from "../role/RoleProvider"
import { RaceContext } from "../race/RaceProvider"
import { ClassContext } from "../class/ClassProvider"

export const Register = (props) => {
    const { ranks, getRanks } = useContext(RankContext)
    const { roles, getRoles } = useContext(RoleContext)
    const { races, getRaces } = useContext(RaceContext)
    const { classes, getClasses } = useContext(ClassContext)
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const userPhoto = useRef()
    const passwordDialog = useRef()
    const rank = useRef()
    const role = useRef()
    const userClass = useRef()
    const race = useRef()
    const userSummary = useRef()

    useEffect(() => {
        getRanks()
        getRoles()
        getRaces()
        getClasses()

       
    }, [])

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?name=${username.current.value}`)
            .then(_ => _.json())
            .then(user => !!user.length)
    }

    const handleRegister = () => {
        
        const rankId = parseInt(rank.current.value)
        const roleId = parseInt(role.current.value)
        const raceId = parseInt(race.current.value)
        const classId = parseInt(userClass.current.value)

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
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
                            photo: userPhoto.current.value,
                            summary: userSummary.current.value
                            
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("guild_user", createdUser.id)
                                props.history.push("/")
                            }
                        })
                })
        } else {
            passwordDialog.current.showModal()
        }
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
                    <input ref={username} type="userName"
                        name="UserName"
                        className="form-control"
                        placeholder="Username"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="userPhoto"> Add Photo </label>
                    <input ref={userPhoto} type="file"
                        name="userPhoto"
                        className="form-control"
                        required />
                </fieldset>



                <fieldset>
                <div className="form-group">
                    <label htmlFor="rank">Guild Rank: </label>
                    <select defaultValue="" name="rank" ref={rank} id="userRank" className="form-control" >
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
                    <select defaultValue="" name="role" ref={role} id="userRole" className="form-control" >
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
                    <select defaultValue="" name="race" ref={race} id="userRace" className="form-control" >
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
                    <select defaultValue="" name="class" ref={userClass} id="userClass" className="form-control" >
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
                    <textarea ref={userSummary} type="userSummary"
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
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}