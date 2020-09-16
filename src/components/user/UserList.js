import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { Link } from "react-router-dom"
import "./Users.css"

export const UserList = props => {
    const { users, getUsers } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <h1>Guild Members</h1>

            

            <article className="members">
                {
                    users.map(user => {
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