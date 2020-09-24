import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { Link } from "react-router-dom"
import "./Users.css"

export const UserList = props => {
    const { users, getUsers, searchTerms, setFilter } = useContext(UserContext)
    const [filteredUsers, setFiltered] = useState([])

    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        const matchingUsers = users.filter(user => user.name.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(matchingUsers)
      
    }, [searchTerms])
    useEffect(() => {
        setFiltered(users)
    }, [users])


    


    return (
        <div>
            <h1>Guild Members</h1>

            

            <article className="members">
                {
                    filteredUsers.map(user => {
                        return <section className="member" key={user.id}>
                            <Link to={`/members/${user.id}`}>
                                <h3>{user.name}</h3>

                            </Link>
                        </section>
                    })
                }
            </article>
        </div>
    )
}