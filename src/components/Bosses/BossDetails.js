import React, { useState, useContext, useEffect } from "react"
import { BossContext } from "./BossProvider"
import "./Bosses.css"




export const BossDetails = ( props ) => {
    const { getBosses, bosses, deleteBoss, getBossById } = useContext(BossContext)
    

    const [boss, setBoss] = useState({ dungeon: {} })

    useEffect(() => {
        const bossId = parseInt(props.match.params.bossId)
        getBossById(bossId)
        .then(setBoss)
    }, [])

    


    
 
    return (
        <main className="BossContainer">
            
            <h1 className="boss__name">{boss.name}</h1>

            <div><img  class="boss__image" src={boss.photo} /></div>
            <div className="boss__summary">{boss.summary}</div>
            <div className="boss__dungeon">{boss.dungeon.name}</div>
            <div className="boss__status">{boss.status}</div>
            
            

            <button onClick={() => deleteBoss(boss.id).then(() => props.history.push("/bosses"))} >Delete Boss</button>
            <button onClick={() => {
                props.history.push(`/bosses/edit/${boss.id}`)
            }}>Edit</button>


        <h2>Comments</h2>
        <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Event Name"
                        defaultValue={event.name}
                        onChange={handleControlledInputChange}
                    />
        </main>
    )
}