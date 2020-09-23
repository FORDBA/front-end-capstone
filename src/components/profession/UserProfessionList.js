import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../user/UserProvider"
import { ProfessionContext } from "./ProfessionProvider"
import { UserProfessionContext } from "./UserProfessionProvider"


export const UserProfessionList = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { professions, getProfessions } = useContext(ProfessionContext)
    const { userProfessions, getUserProfessions, getUserProfessionById } = useContext(UserProfessionContext)
    const [filteredUserProfessions, setFiltered] = useState([])
    
    

    useEffect(() => {
        getUsers().then(getProfessions).then(getUserProfessions)
    }, [])
    useEffect(() => {
        setFiltered(userProfessions)
    }, [userProfessions])
   
    

    


    return (
        <div className="userProfessions">
        {
            filteredUserProfessions.map(userProfession => {
                userProfession.users = users.find(u => u.id === userProfession.userId)
                userProfession.professions = professions.find(p => p.id === userProfession.professionId)
                if (userProfession.users.id === parseInt(localStorage.getItem("guild_user"))) {

                    return <section className="userProfession" key={userProfession.id}>
                    <div>{userProfession.professions.name}</div>
                </section> 
                }
            })
        }        
                                  

                     
            
        </div >
    )
}
    
    