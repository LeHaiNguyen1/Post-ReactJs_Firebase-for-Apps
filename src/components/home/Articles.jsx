import {collectionGroup, onSnapshot, query} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {auth, db} from "../../firebaseConfig";
import DeleteArticle from "../deleteArticle/DeleteArticle";
import LikeArticle from "../like/LikeArticle";
import Comment from "../comment/Comment";


export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [user, setUser] = useState('');


    // Xử lý quá trình load user và bài post
    useEffect(async () => {
        auth.onAuthStateChanged((user) => setUser(user.uid))
        const articleRef = query(collectionGroup(db, "userPost"))
        const unsub = onSnapshot(articleRef, async (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                uid: doc.ref.parent.parent.id,
                id: doc.id,
                ...doc.data()
            }));
            // lấy data từ user lấy ra được cái tên từ id
            const arrPosts = await Promise.all(
                articles.map(async (post) => {
                    const uPost = {
                        ...post,
                        name: (await db.doc(`users/${post.uid}`).get()).data().name
                    }
                    return uPost
                }))
            setArticles(arrPosts);
        });
        return unsub
    }, []);

    return (
        <div>
            {articles.length === 0 ? (
                <p>No articles found!</p>
            ) : (
                articles.map((item) => {
                    {
                        //check xem item có tồn tại hay không
                        // console.log('Check item', item)
                    }
                    return (

                        <div className="border mt-3 p-3 bg-light" key={item.id}>
                            <div className="row">
                                <div className="col-3">
                                    <img
                                        src={item.imageUrl}
                                        alt="title"
                                        style={{height: 180, width: 200}}
                                    />
                                </div>
                                <div className="col-9 ps-3">
                                    <div className="row">
                                        <div className="col-6">
                                            {item.name && (
                                                <span className="badge bg-primary">{item.name}</span>
                                            )}
                                        </div>
                                        <div className="col-6 d-flex flex-row-reverse">
                                            {user && user.uid === item.userId && (
                                                <DeleteArticle id={item.id} imageUrl={item.imageUrl}/>
                                            )}
                                        </div>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.createdAt.toDate().toDateString()}</p>
                                    <h5>{item.description}</h5>
                                    <hr/>
                                    <div>
                                        Comment
                                        <div>
                                            <Comment idPost={item.id} user={user}/>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row-reverse">
                                        {user && <LikeArticle id={item.id} likes={item.likes}/>}
                                        <div className="pe-2">
                                            <p>{item.likes?.length} likes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    );
}
