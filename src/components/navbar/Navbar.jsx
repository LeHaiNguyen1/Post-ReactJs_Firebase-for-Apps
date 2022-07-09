import React from "react";
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebaseConfig";
import {signOut} from "firebase/auth";


export default function Navbar() {
    const [user] = useAuthState(auth);
    return (
        <div className="fixed-top border" style={{backgroundColor: "whitesmoke"}}>
            <nav className="navbar">
                <div>
                    <img
                        src="logo192.png"
                        width={30}
                        height={30}
                        alt="logo"
                        className="ms-5"
                    />
                </div>
                <Link className="nav-link" to="/">
                    Home{" "}
                </Link>
                <input type="text" placeholder="Tìm kiếm..."/>
                <div>

                    {user && (
                        <>
                            <Link to="/RegiterEdit">{user.email}</Link>


                            <button className="btn btn-primary btn-sm me-3"
                                    onClick={() => {
                                        signOut(auth)
                                    }}
                            >Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
