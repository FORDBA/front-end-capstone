import React, { useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { RankContext } from "../rank/RankProvider"

export const UserSearch = () => {
    const { setTerms, setFilter, user } = useContext(UserContext)
    const { ranks, getRanks } = useContext(RankContext)

    useEffect(() => {
        getRanks()
    }, [])

    return (
        <>
            <div>Search for a guild memeber</div>
            <input type="text"
                onChange={
                    (changeEvent) => {
                        setTerms(changeEvent.target.value)
                    }
                }
                placeholder="Enter search string here..." />

                
        </>
    )
}