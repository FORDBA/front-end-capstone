import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { UserProfessionContext } from "../profession/UserProfessionProvider"
import { User } from "./User"
import "./Users.css"
import { UserProfessionList } from "../profession/UserProfessionList"
import { NeededBossList } from "../Bosses/NeededBossesList"
import { TreasureList } from "../Loot/TreasureList"

export const Profile = ({ history }) => {
    
    const { getUsers, users, searchTerms, getUserById } = useContext(UserContext)
    

    const [user, setUser] = useState({ rank: {}, role: {}, class: {}, race: {} })
   

    useEffect(() => {
        const userId = parseInt(localStorage.getItem("guild_user"))
        getUserById(userId)
        .then(setUser)
                
    }, [])

    
    




    

    


    
    
 
    return (
        <main className="ProfileContainer">
            
            <h1>Profile</h1>

            <div className="profile__name">{user.name}</div>
            <div className="profile__rank">{user.rank.name}</div>
            <div className="profile__details">{user.race.name} {user.class.name}</div>
            <img  className="profile__image" src={user.photo} />
            <div className="profile__Summary">{user.summary}</div>
            <button onClick={() => {
                history.push(`/profile/edit/${user.id}`)
            }}>Edit</button>

                       
               
            <button onClick={() => history.push("/profile/createprofs")}>
                Add Professions
                </button>
            
           
                <button onClick={() => history.push("/profile/createbossesneeded")}>
                Add Bosses
                </button>

            

            

            <button onClick={() => history.push("/profile/createloot")}>
                Add Loot
                </button>
                
            <div className="profile">
               
            </div>
        </main>
    )
}