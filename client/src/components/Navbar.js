import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom'
import "../style/navbar.css"


const Navbar = () => {

    const getItem = localStorage.getItem("user-token")
    // const homevalid = useLocation()
    // const homePath = homevalid.pathname

    const getUser = localStorage.getItem("user")
    JSON.parse(getUser)
    const role = JSON.parse(getUser).role
    const checkRole = () => {
        return
    }

    useEffect(() => {
        checkRole()

    }, [getItem, getUser, checkRole()])


    return (
        <>

            <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container-fluid'>
                    <Link className="navbar-brand" to="">Book</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {role === 'Author' ? <li className="nav-item">
                                <Link className="nav-link" to="/book">AddBook</Link>
                            </li> : null}
                            {
                                getItem ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={() => {
                                            localStorage.removeItem("user-token")
                                            localStorage.removeItem("user")
                                            window.location.reload();
                                        }}>Logout</Link>
                                    </li>

                                </> : <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Signup</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                            }

                        </ul>
                        {/* <ul className="navbar-nav ml-auto nav-flex-icons">
                    <li className="nav-item">
                        <Link className="nav-link waves-effect waves-light"><i className="fa fa-twitter"></i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link waves-effect waves-light"><i className="fa fa-google-plus"></i></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user"></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right dropdown-unique" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="">Action</Link>
                            <Link className="dropdown-item" to="">Another action</Link>
                            <Link className="dropdown-item" to="">Something else here</Link>
                        </div>
                    </li>
                </ul> */}
                    </div>
                </div>

            </nav>
        </>

    )
}


export default Navbar