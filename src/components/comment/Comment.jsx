import React, {useEffect, useState} from "react";
import {db} from "../../firebaseConfig";
import {onSnapshot} from "firebase/firestore";

export default function Comment({idPost, user}) {
    const [comments, setComments] = useState('')
    const [comment, setComment] = useState([]);

    const handleComment = () => {
        db.collection("comment").doc(`${idPost}`).collection("postComment").add({
            userRef: db.doc(`users/${user}`),
            comment: comments
        })
    }
    useEffect( () => {

          const Declare = db.collection(`comment/${idPost}/postComment`)
                const virtualization =  onSnapshot(Declare, async (snap) => {
                    let array = []
                    snap.forEach( (doc) => {
                        array.push({
                            id: doc.id,
                            comment: doc.data().comment,
                            userRef: doc.data().userRef
                        }); })

                    const arrPosts = await Promise.all(
                        array.map(async (post) => {
                            const cPost ={
                                ...post,
                                userRef: (await db.doc(post.userRef.path).get()).data().name
                            }
                            return cPost
                        }))
                    setComment(arrPosts)
                    console.log(arrPosts)
                })
return virtualization
    }, [idPost])

    return (
        <div>
            <ul>
                {comment.map((comment) => (

                        <div className="my-comments" key={comment.id}>
                            <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32"
                                 data-view-component="true" className="octicon octicon-mark-github v-align-middle">
                                <path fill-rule="evenodd"
                                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                            <b>{comment.userRef}</b>
                            <br/>
                            <ul>
                                <li>
                                {comment.comment}
                                </li>
                            </ul>

                        </div>

                ))}
            </ul>
            {user && (
                <>
                    <input
                        type="text"
                        value={comments}
                        onChange={(e) => {
                            setComments(e.target.value);
                        }}>
                    </input>
                    <button
                        onClick={() =>
                            handleComment()}>
                        Comment
                    </button>
                </>
            )}
        </div>
    )
}
