import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { UserProfessionContext } from "../profession/UserProfessionProvider"
import "./Users.css"
import "../profession/Professions.css"
import "../Bosses/NeededBosses.css"
import "../Loot/Treasures.css"
import { ProfessionContext } from "../profession/ProfessionProvider"
import { BossContext } from "../Bosses/BossProvider"
import { NeededBossContext } from "../Bosses/NeededBossProvider"
import { TreasureContext } from "../Loot/TreasureProvider"

export const UserDetails = (props) => {
    const { getUsers, users, searchTerms, getUserById } = useContext(UserContext)
    const { getUserProfessions, userProfessions } = useContext(UserProfessionContext)
    const { professions, getProfessions } = useContext(ProfessionContext)
    const { bosses, getBosses } = useContext(BossContext)
    const { neededBosses, getNeededBosses, deleteNeededBoss } = useContext(NeededBossContext)
    const { treasures, getTreasures, deleteTreasure, editTreasure } = useContext(TreasureContext)
    const [filteredUserProfessions, setFiltered] = useState([])
    const [filteredNeededBosses] = useState([])
    const [filteredTreasures] = useState([])

    const [user, setUser] = useState({ rank: {}, role: {}, class: {}, race: {} })

    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getUserById(userId)
            .then(setUser)
    }, [])
    useEffect(() => {
        getUsers().then(getProfessions).then(getUserProfessions)
    }, [])
    useEffect(() => {
        setFiltered(userProfessions)
    }, [userProfessions])
    useEffect(() => {
        getUsers().then(getBosses).then(getNeededBosses)
    }, [])
    useEffect(() => {
        setFiltered(neededBosses)
    }, [neededBosses])
    useEffect(() => {
        getUsers().then(getBosses).then(getTreasures)
    }, [])






    return (
        <main className="ProfileContainer">
            <div className="characterContainer">


            

            <h1 className="profile__name">{user.name}</h1>
            <div className="profile__rank">{user.rank.name}</div>
            <div className="profile__details">{user.race.name} {user.class.name}</div>
            <img className="profile__image" src={user.photo} />
            <div className="profile__Summary">{user.summary}</div>
            <h2>Professions</h2>
            <div className="userProfessions">
        {
            userProfessions.map(userProfession => {
                userProfession.users = users.find(u => u.id === userProfession.userId)
                userProfession.professions = professions.find(p => p.id === userProfession.professionId)
                if (userProfession.users.id === parseInt(props.match.params.userId)) {
                    
                    return <section className="userProfession" key={userProfession.id}>
                    <h3>{userProfession.professions.name}</h3>
                </section> 
                }
            })
        } 
        </div > 
        <h2>Bosses Needed For Progression</h2>
        <div className="neededBosses">
        {
            neededBosses.map(neededBoss => {
                neededBoss.users = users.find(u => u.id === neededBoss.userId)
                neededBoss.bosses = bosses.find(b => b.id === neededBoss.bossId)
                if (neededBoss.users.id === parseInt(props.match.params.userId)) {
                    
                    return <section className="neededBoss" key={neededBoss.id}>
                    <h3>{neededBoss.bosses.name}</h3>
                    
                </section> 
                }
            })
        }        
                   
        </div >
            </div>
            <div className="lootContainer">
            <h2>Loot Needed</h2>

        <div className="treasures">
        {
            treasures.map(treasure => {
                treasure.users = users.find(u => u.id === treasure.userId)
                treasure.bosses = bosses.find(b => b.id === treasure.bossId)
                if (treasure.users.id === parseInt(props.match.params.userId)) {
                    
                    return <section className="treasure" key={treasure.id}>
                    <h3>{treasure.name}</h3>
                    <div>Drops From: {treasure.bosses.name}</div>
                    <div>{treasure.reason}</div>
                    
                </section> 
                }
            })
        }        
                                  

                     
            
        </div >
           


            
        </div>
        </main>
    )
}