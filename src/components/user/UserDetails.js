import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { UserProfessionContext } from "../profession/UserProfessionProvider"
import { User } from "./User"
import "./Users.css"

export const UserDetails = ( props ) => {
    const { getUsers, users, searchTerms, getUserById } = useContext(UserContext)
    const { getUserProfessions, userProfessions } = useContext(UserProfessionContext)

    const [user, setUser] = useState({ rank: {}, role: {}, class: {}, race: {} })

    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getUserById(userId)
        .then(setUser)
    }, [])

    


    
 
    return (
        <main className="ProfileContainer">
            
            <h1>Profile</h1>

            <div className="profile__name">{user.name}</div>
            <div className="profile__rank">{user.rank.name}</div>
            <div className="profile__details">{user.race.name} {user.class.name}</div>
            

            
            <div className="profile">
               
            </div>
        </main>
    )
}