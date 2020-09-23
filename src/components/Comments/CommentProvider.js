import React, { useState } from "react"


export const CommentContext = React.createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getComments = () => {
        return fetch("http://localhost:8088/comments")
            .then(res => res.json())
            .then(setComments)
    }
    const getCommentById = (id) => {
        return fetch(`http://localhost:8088/comments/${id}?_expand=user`)
            .then(res => res.json())
    }


    const addComment = boss => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boss)
        })
            .then(getComments)
    }
    const updateComment = comment => {
        return fetch(`http://localhost:8088/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            .then(getComments)
    }
    const deleteComment = (commentId) => {
        return fetch(`http://localhost:8088/comments/${commentId}`, {
            method: "DELETE"
        })
            .then(getComments)
    }

    return (
        <CommentContext.Provider value={{
            comments, getComments, addComment, getCommentById,
            searchTerms, setTerms, deleteComment, updateComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}