import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../user/UserProvider"
import { ProfessionContext } from "./ProfessionProvider"
import { UserProfessionContext } from "./UserProfessionProvider"


export const UserProfessionList = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const { professions, getProfessions } = useContext(ProfessionContext)
    const { userProfessions, getUserProfessions, getUserProfessionById } = useContext(UserProfessionContext)
    
    const [user, setUser] = useState({})
    const [profession, setProfession] = useState({})
    const [userProfession, setUserProfession] = useState({})
    

    


    return (
        <div className="userProfessions">
            
                                  

                     <article key={`location--${userProfession.id}`} className="card location" style={{ width: `18rem` }}>
                        <section className="card-body">

                            <div className="card-link">
                                 <h2 className="card-title">{profession.name}</h2>
                            </div>

                        </section>
                       
                    </article>
            
        </div >
    )
}
    
    