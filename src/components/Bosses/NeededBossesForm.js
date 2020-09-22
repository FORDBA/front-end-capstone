import React, { useContext, useState, useEffect, useRef } from "react"
import { BossContext } from "./BossProvider"
import { NeededBossContext } from "./NeededBossProvider"

export const NeededBossesForm = (props) => {
    const { bosses, getBosses } = useContext(BossContext)
    const { neededBosses, addNeededBoss, updateNeededBoss, getNeededBosses } = useContext(NeededBossContext)

    const [neededBoss, setNeededBoss] = useState({})

    const editMode = props.match.params.hasOwnProperty("neededBossId")
    const boss = useRef()




    const getNeededBossInEditMode = () => {
        if (editMode) {
            const neededBossId = parseInt(props.match.params.neededBossId)
            const selectedNeededBoss = neededBosses.find(a => a.id === neededBossId) || {}
            setNeededBoss(selectedNeededBoss)
        }
    }


    useEffect(() => {
        getNeededBosses()
        getBosses()
    }, [])


    useEffect(() => {
        getNeededBossInEditMode()
    }, [neededBosses])

    
    const constructNewNeededBoss = () => {
        const selectedBosses = Array.from(boss.current.selectedOptions)
        

            selectedBosses.map(bossId=> { 
                
                
                
                
                    if (editMode) {
                        // PUT
                        updateNeededBoss({
                            bossId: parseInt(bossId.value),
                            userId: parseInt(localStorage.getItem("guild_user"))
                        })
                        .then(() => props.history.push("/profile"))
                    } else {
                        debugger
                        // POST
                        addNeededBoss({
                            bossId: parseInt(bossId.value),
                            userId: parseInt(localStorage.getItem("guild_user"))
                        })
                        .then(() => props.history.push("/profile"))
                    }
                
            } )
        
        

        }
    return (
        <form className="neededBossesForm">
            <h2 className="neededBossesForm__title">{editMode ? "Update Needed Bosses" : "Add Needed Bosses"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="professions">Bosses: </label>
                    <select multiple={true} defaultValue="" name="boss" ref={boss} id="neededBoss" className="form-control" >
                        
                        <option value="0">Select Bosses</option>
                        {bosses.map(e => (
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
                    constructNewNeededBoss()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Add Bosses"}
            </button>
        </form>

    )

}