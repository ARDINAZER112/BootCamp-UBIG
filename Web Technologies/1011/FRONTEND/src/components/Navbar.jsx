import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../api'

export default function Navbar({ user, onLogout }) {
  const [navOpen, setNavOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogoutClick = async (e) => {
    e.preventDefault()
    if (user && user.token) {
      try {
        await logout(user.token)
        alert('Logout success')
      } catch (err) {
        console.error('Logout failed:', err)
      }
    }
    onLogout()
    navigate('/', { replace: true })
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
      <div className="container">
        <Link className="navbar-brand" to={user ? "/dashboard" : "/"}>
          Vaccination Platform
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="navbarsExampleDefault">
          <ul className="navbar-nav ml-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#profile" onClick={(e) => e.preventDefault()}>
                    {user.name}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#logout" onClick={handleLogoutClick}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
