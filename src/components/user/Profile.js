import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { UserProfessionContext } from "../profession/UserProfessionProvider"
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
            <div className="characterContainer">
            
            

            <h1 className="profile__name">{user.name}</h1>
            <div className="profile__rank">{user.rank.name}</div>
            <div className="profile__details">{user.race.name} {user.class.name}</div>
            <img  className="profile__image" src={user.photo} />
            <div className="profile__Summary">{user.summary}</div>
            <button onClick={() => {
                history.push(`/profile/edit/${user.id}`)
            }}>Edit</button>

                       
             <h2>Professions</h2>  
            <button onClick={() => history.push("/profile/createprofs")}>
                Add Professions
                </button>
                <UserProfessionList />
            
                <h2>Bosses Needed For Progression</h2>
                <button onClick={() => history.push("/profile/createbossesneeded")}>
                Add Bosses
                </button>
                <NeededBossList {...history} />
                </div>

            

            <div className="lootContainer">

            <h2>Loot Needed</h2>
            <button onClick={() => history.push("/profile/createloot")}>
                Add Loot
                </button>
                <TreasureList />
            </div>
                
            
        </main>
    )
}