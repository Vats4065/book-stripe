import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
    const getItem = localStorage.getItem("user-token")
    useEffect(() => {
        if (getItem) {
            navigate("/")
        }
    }, [navigate, getItem])



    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        number: "",
        role: ""
    })
    const [cpass, setCpass] = useState("")



    const changeInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (data.password === cpass) {
            console.log(data);
            const res = await axios.post("http://localhost:8000/api/registerUser", data, {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
            })
            console.log(res.status);
            if (res.status === 200) {
                navigate("/login")
            }

        }
        else {
            alert("enter correct password")
        }
    }
    return (
        <section className="vh-100 bg-light">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black rounded" >
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" name="name" value={data.name} onChange={changeInput} />
                                                    <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" name="email" value={data.email} onChange={changeInput} className="form-control" />
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" name="number" value={data.number} onChange={changeInput} />
                                                    <label className="form-label" htmlFor="form3Example1c">Your Mobile Number</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <select name="role" id="form3Example1c" className='form-control' onChange={changeInput} value={data.role}>
                                                        <option value="" disabled selected>Select</option>
                                                        <option value="Author">Author</option>
                                                        <option value="User">User</option>
                                                    </select>

                                                    <label className="form-label" htmlFor="form3Example1c">Select Role</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" className="form-control" name="password" value={data.password} onChange={changeInput} />
                                                    <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" className="form-control" name="cpass" value={cpass} onChange={(e) => setCpass(e.target.value)} />
                                                    <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                                </div>
                                            </div>

                                            <div className=" justify-content-center mx-4 mb-3 mb-lg-4">
                                                <p className="small fw-bold pt-1 ">Already Have an account? <Link to="/login"
                                                    className="link-danger">Login</Link></p>
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg mt-3">Register</button>

                                            </div>
                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxe6R41ajDF3SY-8rpmh7IwFr-lDH0xCsolQ1THPZkaUm7P8Zm6qdLvHo2ekWej-MvS8&usqp=CAU"
                                            className="img-fluid w-100 rounded" alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup