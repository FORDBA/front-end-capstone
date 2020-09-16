import React from "react"
import "./Users.css"
import { Link } from "react-router-dom"

export const User = ({ user }) => (
    <section className="user--">
        <h3 className="animal__name">
            <Link to={`/animals/${user.id}`}>
                { user.name }
            </Link>
        </h3>
        <div className="animal__breed">{ user.summary }</div>
    </section>
)