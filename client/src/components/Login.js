import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const getItem = localStorage.getItem("user-token")
  useEffect(() => {
    if (getItem) {
      navigate("/")
    }
  }, [getItem, navigate])


  const changeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    const res = await axios.post("http://localhost:8000/api/loginUser", data, {
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
    })
    console.log(res);
    if (res.status === 200) {
      localStorage.setItem("user-token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.find))
     
    }
  }



  return (
    <section className="vh-100 w-75 mx-auto mt-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>


              <div data-mdb-input-init className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                  placeholder="Enter a valid email address" name='email' onChange={changeInput} />
                <label className="form-label" for="form3Example3">Email address</label>
              </div>


              <div data-mdb-input-init className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Enter password" name='password' onChange={changeInput} />
                <label className="form-label" for="form3Example4">Password</label>
              </div>


              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                >Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                  className="link-danger">Register</Link></p>
              </div>

            </form>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Login