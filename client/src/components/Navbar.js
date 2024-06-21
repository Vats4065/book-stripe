import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom'
import "../style/navbar.css"
import { IoMdCart } from "react-icons/io";


const Navbar = () => {

    const getItem = localStorage.getItem("user-token")
    // const homevalid = useLocation()
    // const homePath = homevalid.pathname

    const getUser = localStorage.getItem("user")
    JSON.parse(getUser)
    const role = JSON.parse(getUser)?.role
    const checkRole = () => {
        return
    }

    useEffect(() => {
        checkRole()

    }, [])


    return (
        <>

            {getUser && getItem ? <nav className=" navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container-fluid'>
                    <Link className="navbar-brand" to="">Book</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent-3">
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
                                        <Link className="nav-link" to="/check">AddCard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={() => {
                                            alert("Are you sure to Logout");
                                            if (alert) {
                                                localStorage.removeItem("user-token")
                                                localStorage.removeItem("user")
                                                window.location.reload();
                                            }

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
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <IoMdCart color='white' size={25} />
                                </Link>
                            </li>
                        </ul>



                    </div>
                </div>

            </nav > : ""}
        </>

    )
}


export default Navbar