import React, {useEffect, useState} from "react";
import {auth, db} from "../../firebaseConfig";
import {collection, doc, getDocs,onSnapshot,serverTimestamp} from "firebase/firestore";


export default function RegiterEdit() {
    const [name, setName] = useState('');
    const [dod, setDod] = useState("");
    const [post, setPost] = useState([])

    useEffect(() => {
        const docRef = db.collection("users").doc(auth.currentUser.uid)
        onSnapshot(docRef, (snapshot) => {
            setPost({
                ...snapshot.data(),
                id: snapshot.id });
        });

    }, []);

    const handleSignup = async () => {
        db.collection("users").doc(auth.currentUser.uid).update({
            name: name,
            dod: dod,
            update_at: serverTimestamp()
        })
        alert("Updated successfully");
    };
    return (
        <div className="border p-3 bg-light " style={{marginTop: 70}}>
            <h1>User information</h1>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={post.name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <label>Birthday</label>
                <input
                    value={post.dod}
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                        setDod(e.target.value);
                    }}
                />
            </div>
            <br/>
            <button className="btn btn-primary" onClick={handleSignup}>
                Update
            </button>
        </div>

    );

}
