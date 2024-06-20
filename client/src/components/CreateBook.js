import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateBook = () => {

  const [data, setData] = React.useState({
    name: "",
    title: "",
    author: "",
    price: "",
    description: "",
    image: "",
    quantity: ""
  })

  const [img, setImg] = useState()

  console.log(img);
  const getItem = localStorage.getItem("user")
  const res = JSON.parse(getItem)

  const changeInput = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value,
      image: img,
      author: res._id
    })


  }
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(res);
    axios
      .post("http://localhost:8000/api/createBook", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then((res) => {
        console.log("res,", res.data)
        toast.success("book created successfully")
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      <section className="h-100 h-custom" style={{ "backgroundColor": " #eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6 rounded " >
              <div className="card rounded-3 " style={{ overflow: "hidden" }}>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp" className="w-100" alt="Sample photo" />
                <div className="card-body p-4 p-md-5">


                  <form className="px-md-2" onSubmit={handleSubmit} encType="multipart/form-data">

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" id="form3Example1q" className="form-control" name='name' value={data.bookname} onChange={changeInput} />
                      <label className="form-label" htmlFor="form3Example1q">BookName</label>
                    </div>



                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" className="form-control" id="exampleDatepicker1" name="description" value={data.description} onChange={changeInput} />
                      <label htmlFor="exampleDatepicker1" className="form-label" >Description</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" className="form-control" id="exampleDatepicker1" name="title" value={data.title} onChange={changeInput} />
                      <label htmlFor="exampleDatepicker1" className="form-label" >Title</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="file" className="form-control" id="exampleDatepicker1" accept='image/*' name='image' onChange={(e) => {
                        setImg(e.target.files[0]);
                      }} />
                      <label htmlFor="exampleDatepicker1" className="form-label" >Image</label>
                    </div>


                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" className="form-control" id="exampleDatepicker1" name="price" value={data.price} onChange={changeInput} />
                      <label htmlFor="exampleDatepicker1" className="form-label"  >Price</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="number" className="form-control" id="exampleDatepicker1" name="quantity" value={data.quantity} onChange={changeInput} />
                      <label htmlFor="exampleDatepicker1" className="form-label"  >Quantity</label>
                    </div>



                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg mb-1">Submit</button>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CreateBook