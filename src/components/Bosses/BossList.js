import React, { useState, useContext, useEffect } from "react"
import { BossContext } from "./BossProvider"
import { Link } from "react-router-dom"
import "./Bosses.css"

export const BossList = ({ history }) => {
    const { bosses, getBosses, searchTerms } = useContext(BossContext)
    const [filteredBosses, setFiltered] = useState([])

    useEffect(() => {
        getBosses()
    }, [])
    useEffect(() => {
        const matchingBosses = bosses.filter(boss => boss.name.toLowerCase().includes(searchTerms.toLowerCase()))
        setFiltered(matchingBosses)
    }, [searchTerms])
    useEffect(() => {
        setFiltered(bosses)
    }, [bosses])

    return (
        <div>
            <h1>Bosses</h1>

            

            <article className="bosses__container">
            <button onClick={() => history.push("/bosses/createboss")}>
                Add Bosses
                </button>
               <div className="bosses" >
                {
                    filteredBosses.map(boss => {
                        return <section className="boss" key={boss.id}>
                            <Link to={`/bosses/${boss.id}`}>
                                <h3>{boss.name}</h3>

                            </Link>
                        </section>
                    })
                }
                </div>
            </article>
        </div>
    )
}