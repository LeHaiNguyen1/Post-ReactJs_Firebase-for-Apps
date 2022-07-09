import React, {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, db} from "../../firebaseConfig";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [dod, setDod] = useState("");
    let navigate = useNavigate();

    const handleSignup = async () => {
        try {

            await createUserWithEmailAndPassword(auth, email, password).then(user => {
                const md5 = require("md5")
                return db.collection("users").doc(auth.currentUser.uid).set({
                    email: user.user.email,
                    name: name,
                    password: md5(password),
                    created_at: new Date(),
                    update_at: new Date(),
                    dod: dod
                }).then(() => {
                    console.log('user create')

                })
            });
            updateProfile(auth.currentUser, { displayName: name });
            navigate("/");
        } catch (error) {
            toast(error.code, { type: "error" });
        }
    };
    return (
        <div className="border p-3 bg-light " style={{ marginTop: 70 }}>
            <h1>Register</h1>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="date"
                    className="form-control"
                    placeholder="Birtday"
                    onChange={(e) => {
                        setDod(e.target.value);
                    }}
                />
            </div>
            <br />
            <button className="btn btn-primary" onClick={handleSignup}>
                Register
            </button>
        </div>
    );
}
