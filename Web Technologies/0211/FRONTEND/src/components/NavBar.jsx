import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

export default function NavBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault()
        const message = await logout()
        navigate('/', { replace: true, state: { message } })
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
            <div className="container">
                <Link className="navbar-brand" to={user ? '/dashboard' : '/'} href="#">
                    Installment Cars
                </Link>
                <ul className="navbar-nav ml-auto flex-row">
                    {user ? (
                        <>
                            <li className="nav-item"><span className="nav-link">{user.name}</span></li>
                            <li className="nav-item">
                                <a className="nav-link ml-3" href="#" onClick={handleLogout}>Logout</a>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item"><Link className="nav-link" to="/">login</Link></li>
                    )}
                </ul>
                {/* <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggle-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Marsito Kusmawati</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Logout</a>
                        </li>
                    </ul>
                </div> */}
            </div>
        </nav>
    )
}