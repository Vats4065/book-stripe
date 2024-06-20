import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [book, setBook] = useState([])
  const [author, setAuthor] = useState("")

  // const getPost = async () => {
  //   await
  // };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getAllBook")
      .then((res) => { return res })
      .then((data) => {
        setBook(data.data.find)
        console.log("data", data)
      });
  }, []);

  console.log(book);

  return (
    <section style={{ "backgroundColor": " #eee" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          {book.map((item) => {
            return <>
              <div className="col-md-8 col-lg-6 col-xl-4" style={{marginBottom:"50px"}}>
                <div className="card" style={{ "borderRadius": "15px" }}>
                  <div className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                    data-mdb-ripple-color="light">
                    <img src={`http://localhost:8000/${item?.image}`}
                      style={{ "borderTopLeftRadius": "15px", "borderTopRightRadius": " 15px" }} className="img-fluid"
                      alt="Laptop" />
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                  </div>
                  <div className="card-body pb-0">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p>Book Name: {item?.name}</p>
                        <p className="small text-muted">Title: {item?.title}</p>
                        <p>Author : {item?.author?.name}</p>
                        <button className='btn btn-outline-secondary mb-2' style={{fontSize:"15px"}} >Add to cart</button>
                      </div>

                    </div>
                  </div>
                  <hr className="my-0" />
                  <div className="card-body pb-0">
                    <h5>Price: {item?.price}</h5>
                    <p className="text-dark">{item?.description}</p>
                    <p className="small text-muted">Available Only: {item?.quantity} Copy</p>
                  </div>

                </div>
              </div>
            </>
          })}


        </div>
      </div>
    </section>
  )
}

export default Home