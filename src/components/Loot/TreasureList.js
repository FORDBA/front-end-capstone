import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../user/UserProvider"
import { BossContext } from "../Bosses/BossProvider"
import { TreasureContext } from "./TreasureProvider"


export const TreasureList = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { bosses, getBosses } = useContext(BossContext)
    const { treasures, getTreasures, deleteTreasure, editTreasure } = useContext(TreasureContext)
    const [filteredTreasures, setFiltered] = useState([])
    
    

    useEffect(() => {
        getUsers().then(getBosses).then(getTreasures)
    }, [])
    useEffect(() => {
        setFiltered(treasures)
    }, [treasures])
   
    

    


    return (
        <div className="treasures">
        {
            filteredTreasures.map(treasure => {
                treasure.users = users.find(u => u.id === treasure.userId)
                treasure.bosses = bosses.find(b => b.id === treasure.bossId)
                if (treasure.users.id === parseInt(localStorage.getItem("guild_user"))) {

                    return <section className="treasure" key={treasure.id}>
                    <h3>{treasure.name}</h3>
                    <div>Drops From: {treasure.bosses.name}</div>
                    <div>{treasure.reason}</div>
                    <button onClick={() => deleteTreasure(treasure.id).then(() => props.history.push("/profile"))} >Delete</button>
                </section> 
                }
            })
        }        
                                  

                     
            
        </div >
    )
}
    