import React, { useRef, useContext, useState, useEffect } from "react"
import { BossContext } from "./BossProvider"
import { DungeonContext } from "../Dungeons/DungeonProvider"
import "./Bosses.css"


export const BossForm = (props) => {
    
    const { dungeons, getDungeons } = useContext(DungeonContext)
    const { addBoss, bosses, updateBoss, getBosses } = useContext(BossContext)

   
    const [boss, setBoss] = useState({})
    
    const bossSummary = useRef()

    
    const editMode = props.match.params.hasOwnProperty("bossId")  

    const handleControlledInputChange = (event) => {
       
        const newBoss = Object.assign({}, boss)          
        newBoss[event.target.name] = event.target.value    
        setBoss(newBoss)                                 
    }

    
    const getBossInEditMode = () => {
        if (editMode) {
            const bossId = parseInt(props.match.params.bossId)
            const selectedBoss = bosses.find(a => a.id === bossId) || {}
            setBoss(selectedBoss)
        }
    }
    const [loading,setLoading] = useState(false)
    const [image,setImage] = useState("")
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset','wgwpr9x3')
        setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/dbdxcl9wd/image/upload",
        {
            method: 'POST',
            body:data
        })
        const file = await res.json()
        console.log(file)

        setImage(file.secure_url)
        setLoading(false)


    }

    
    useEffect(() => {
        getBosses()
        getDungeons()
    }, [])

    
    useEffect(() => {
        getBossInEditMode()
    }, [bosses])


    const constructNewBoss = () => {
        const dungeonId = parseInt(boss.dungeonId)

        if (dungeonId === 0) {
            window.alert("Please select a location")
        } else {
            if (editMode) {
                
                updateBoss({
                    id: boss.id,
                    name: boss.name,
                    photo: image,
                    dungeonId: dungeonId,
                    summary: bossSummary.current.value,
                    status: boss.status
                })
                    .then(() => props.history.push("/bosses"))
            } else {
                
                addBoss({
                    name: boss.name,
                    photo: image,
                    dungeonId: dungeonId,
                    summary: bossSummary.current.value,
                    status: boss.status
                })
                    .then(() => props.history.push("/bosses"))
            }
        }
    }
    
    return (
        <form className="bossForm">
            <h2 className="bossForm__title">{editMode ? "Update Boss" : "Add Boss"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Boss name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Boss name"
                        defaultValue={boss.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                    <label htmlFor="bossPhoto"> Add Photo </label>
                    <div><input type="file"
                        name="bossPhoto"
                        className="form-control"
                        required 
                        onChange={uploadImage}
                        />

                        {
                            loading?(
                                <div>Loading...</div>
                            ): (
                                <img src={image} />
                            )
                        }
                        </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="bossSummary"> Summary </label>
                    <textarea ref={bossSummary} type="bossSummary"
                        name="bossSummary"
                        className="form-control"
                        required
                        onChange={handleControlledInputChange}
                        />
                </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dungeonId">Location: </label>
                    <select name="dungeonId" className="form-control"
                        value={boss.dungeonId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a Dungeon</option>
                        {dungeons.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Boss status: </label>
                    <input type="text" name="status" required autoFocus className="form-control"
                        placeholder="Boss status"
                        defaultValue={boss.status}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
                
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewBoss()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Save"}
            </button>
        </form>
    )
}