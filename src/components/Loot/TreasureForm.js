import React, { useRef, useContext, useState, useEffect } from "react"
import { TreasureContext } from "./TreasureProvider"
import { BossContext } from "../Bosses/BossProvider"
import "./Treasures.css"


export const TreasureForm = (props) => {
    
    const { bosses, getBosses } = useContext(BossContext)
    const { addTreasure, treasures, updateTreasure, getTreasures } = useContext(TreasureContext)

   
    const [treasure, setTreasure] = useState({})
    
    const treasureSummary = useRef()

    
    const editMode = props.match.params.hasOwnProperty("treasureId")  

    const handleControlledInputChange = (event) => {
       
        const newTreasure = Object.assign({}, treasure)          
        newTreasure[event.target.name] = event.target.value    
        setTreasure(newTreasure)                                 
    }

    
    const getTreasureInEditMode = () => {
        if (editMode) {
            const treasureId = parseInt(props.match.params.treasureId)
            const selectedTreasure = treasures.find(a => a.id === treasureId) || {}
            setTreasure(selectedTreasure)
        }
    }
    

    
    useEffect(() => {
        getTreasures()
        getBosses()
    }, [])

    
    useEffect(() => {
        getTreasureInEditMode()
    }, [treasures])


    const constructNewTreasure = () => {
        const bossId = parseInt(treasure.bossId)

        if (bossId === 0) {
            window.alert("Please select a Boss")
        } else {
            if (editMode) {
                
                updateTreasure({
                    id: treasure.id,
                    name: treasure.name,
                    bossId: bossId,
                    userId: parseInt(localStorage.getItem("guild_user")),
                    reason: treasureSummary.current.value
                })
                    .then(() => props.history.push("/profile"))
            } else {
                
                addTreasure({
                    name: treasure.name,
                    bossId: bossId,
                    userId: parseInt(localStorage.getItem("guild_user")),
                    reason: treasureSummary.current.value
                })
                    .then(() => props.history.push("/profile"))
            }
        }
    }
    
    return (
        <form className="treasureForm">
            <h2 className="TreasureForm__title">{editMode ? "Update Loot" : "Add Loot"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Loot name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Loot name"
                        defaultValue={treasure.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bossId">Location: </label>
                    <select name="bossId" className="form-control"
                        value={treasure.bossId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a Dungeon</option>
                        {bosses.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            
                <fieldset>
                    <label htmlFor="TreasureSummary"> Provide Justification </label>
                    <textarea ref={treasureSummary} type="treasureSummary"
                        name="TreasureSummary"
                        className="form-control"
                        required
                        onChange={handleControlledInputChange}
                        />
                </fieldset>
            
            
                
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewTreasure()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Save"}
            </button>
        </form>
    )
}