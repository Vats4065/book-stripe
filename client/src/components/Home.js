import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {

  const [book, setBook] = useState([])
  const email = JSON.parse(localStorage.getItem('user')).email
  const [data, setData] = useState({
    userId: "",
    items: [{
      bookId: "",
      price: "",
      quantity: ""
    }],
    totalPrice: ""
  })


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getAllBook")
      .then((res) => { return res })
      .then((data) => {
        setBook(data.data.find)
        console.log("data", data)
      });
  }, []);



  const handleBuy = async (item) => {
    console.log(item);
    const { price, title } = item
    console.log(price, title);
    const res = await axios.post("http://localhost:8000/api/create-payment", { price, title, email }, {
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
    })
    console.log(res);
  }


  const handleCart = async (item) => {
    console.log(item)
    // const qty = 1
    // const price = item?.price

    // setData({
    //   ...data, userId: item?.author._id,
    //   items: [{
    //     bookId: item?._id,
    //     price: item?.price,
    //     qty
    //   }],
    //   totalPrice: price * qty
    // })





    const res = await axios.post(`http://localhost:8000/api/addCart/${item?._id}`, item, {
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
    })
    console.log(res);
  }
  console.log(data);


  console.log(book);

  return (
    <section className='vh-100' style={{ "backgroundColor": " #eee" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          {book.map((item) => {
            return <>
              <div className="col-md-8 col-lg-6 col-xl-4" style={{ marginBottom: "50px" }}>
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
                        <button className='btn btn-outline-secondary mb-2' style={{ fontSize: "15px" }} onClick={() => { handleCart(item) }}>Add to cart</button>
                        <button className='btn btn-outline-dark mb-2 ms-2' onClick={() => handleBuy(item)} style={{ fontSize: "15px" }} >Buy</button>
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