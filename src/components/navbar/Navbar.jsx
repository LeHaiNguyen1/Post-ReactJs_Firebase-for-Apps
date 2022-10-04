import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebaseConfig'
import { signOut } from 'firebase/auth'
import '../../components/navbar/Navbar.css'

export default function Navbar() {
  const [user] = useAuthState(auth)
  return (
    <div id="container" className="fixed-top border">
      <nav className="navbar">
        <div className="logo ms-5"></div>
        <div className="menu">
          <Link className="nav-link" to="/">
            Home{' '}
          </Link>
          <Link className="nav-link" to="/Collection">
            Collection{' '}
          </Link>
          <Link className="nav-link" to="/Block">
            Block{' '}
          </Link>
          <Link className="nav-link" to="/About">
            About{' '}
          </Link>
        </div>
        <div>
          {user ? (
            <div id="login">
              <>
                <div
                  class="navigation"
                  onClick={() => {
                    signOut(auth)
                  }}
                >
                  <a class="button" href="">
                    <img src="https://pbs.twimg.com/profile_images/378800000639740507/fc0aaad744734cd1dbc8aeb3d51f8729_400x400.jpeg" />
                    <div class="logout">LOGOUT</div>
                  </a>
                </div>
              </>
            </div>
          ) : (
            <div>
              <div id="login">
                <Link to="/signin"> Signin |{''}</Link>
                <Link to="/Register">| Register {''} </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
