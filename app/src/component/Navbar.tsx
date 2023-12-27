import React, { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { UserContext } from "../App";
import { UserContextType } from "../context/Types";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;

  const location = useLocation()
  useEffect(() => { }, [location])

  const getActiveTag = (target: string) => {
    return target === location.pathname ? 'active' : 'inactive'
  }

  return (
    <nav className="navbar bg-dark navbar-dark navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#/">Electron Blog</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link ${getActiveTag('/')}`} href="#/">Home</a>
            </li>
            {
              user ?
                <li className="nav-item">
                  <a className={`nav-link ${getActiveTag('/new')}`} href="#/new">New Post</a>
                </li> : null
            }
            {
              user ?
                <li className="nav-item">
                  <a className={`nav-link ${getActiveTag('/logout')}`} href="#/logout">Sign out</a>
                </li> :
                <li className="nav-item">
                  <a className={`nav-link ${getActiveTag('/login')}`} href="#/login">Sign In</a>
                </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;