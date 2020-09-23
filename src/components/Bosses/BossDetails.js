import React, { useState, useContext, useEffect, useRef } from "react"
import { BossContext } from "./BossProvider"


import "./Bosses.css"
import { CommentContext } from "../Comments/CommentProvider"
import { UserContext } from "../user/UserProvider"




export const BossDetails = ( props ) => {
    const { getBosses, bosses, deleteBoss, getBossById } = useContext(BossContext)
    const { addComment, comments, updateComment, getComments } = useContext(CommentContext)
    const { users, getUsers } = useContext(UserContext)
    const [comment, setComment] = useState({})
    const commentText = useRef()

    const [boss, setBoss] = useState({ dungeon: {} })

    useEffect(() => {
        const bossId = parseInt(props.match.params.bossId)
        getBossById(bossId)
        .then(setBoss)
    }, [])

    useEffect(() => {
        getUsers().then(getBosses).then(getComments)

    }, [])
    const handleControlledInputChange = (event) => {
       
        const newComment = Object.assign({}, comment)          
        newComment[event.target.comment] = event.target.value    
        setComment(newComment)                                 
    }
    const editMode = props.match.params.hasOwnProperty("commentId")
    const getCommentInEditMode = () => {
        if (editMode) {
            const commentId = parseInt(props.match.params.commentId)
            const selectedComment = comments.find(a => a.id === commentId) || {}
            setComment(selectedComment)
        }
    }

    
    const constructNewComment = () => {
        

        
            if (editMode) {
                
                updateComment({
                    id: comment.id,
                    userId: parseInt(localStorage.getItem("guild_user")),
                    bossId: boss.id,
                    comment: commentText.current.value
                    
                })
                    .then(() => props.history.push(`/bosses/${boss.id}`))
            } else {
                
                addComment({
                    id: comment.id,
                    userId: parseInt(localStorage.getItem("guild_user")),
                    bossId: boss.id,
                    comment: commentText.current.value
                })
                    .then(() => props.history.push(`/bosses/${boss.id}`))
            }
        
    }
    
    
 
    return (
        <main className="BossContainer">
            
            <h1 className="boss__name">{boss.name}</h1>

            <div><img  class="boss__image" src={boss.photo} /></div>
            <div className="boss__summary">{boss.summary}</div>
            <div className="boss__dungeon">{boss.dungeon.name}</div>
            <div className="boss__status">{boss.status}</div>
            
            

            <button onClick={() => deleteBoss(boss.id).then(() => props.history.push("/bosses"))} >Delete Boss</button>
            <button onClick={() => {
                props.history.push(`/bosses/edit/${boss.id}`)
            }}>Edit</button>


        <h2>Comments</h2>
        <textarea ref={commentText} type="commentText"
                        name="commentText"
                        className="form-control"
                        required
                        onChange={handleControlledInputChange}
                        />
                        <button onClick={() => constructNewComment()}>Add Comment</button>
        {
                comments.map(comment => {
                    comment.users = users.find(u => u.id === comment.userId)
                    comment.bosses = bosses.find(b => b.id === comment.bossId)
                    if(comment.bossId === boss.id ){
                        return (
                            <section className="comment">

            
                            <div>{comment.comment}</div>
                            <div>{comment.users.name}</div>
                            </section>
                        )

                    }
                  }
                )
            }


        </main>
    )
}