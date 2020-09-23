import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../user/UserProvider"
import { BossContext } from "./BossProvider"
import { NeededBossContext } from "./NeededBossProvider"


export const NeededBossList = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { bosses, getBosses } = useContext(BossContext)
    const { neededBosses, getNeededBosses, deleteNeededBoss } = useContext(NeededBossContext)
    const [filteredNeededBosses, setFiltered] = useState([])
    
    

    useEffect(() => {
        getUsers().then(getBosses).then(getNeededBosses)
    }, [])
    useEffect(() => {
        setFiltered(neededBosses)
    }, [neededBosses])
   
    

    


    return (
        <div className="neededBosses">
        {
            filteredNeededBosses.map(neededBoss => {
                neededBoss.users = users.find(u => u.id === neededBoss.userId)
                neededBoss.bosses = bosses.find(b => b.id === neededBoss.bossId)
                if (neededBoss.users.id === parseInt(localStorage.getItem("guild_user"))) {

                    return <section className="neededBoss" key={neededBoss.id}>
                    <div>{neededBoss.bosses.name}</div>
                    <button onClick={() => deleteNeededBoss(neededBoss.id).then(() => props.history.push("/profile"))} >Delete</button>
                </section> 
                }
            })
        }        
                                  

                     
            
        </div >
    )
}
    
    