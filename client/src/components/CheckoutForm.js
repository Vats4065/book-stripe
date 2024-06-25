import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [cardData, setCardData] = useState({})
  const [update, setUpdate] = useState(false)
  const [cardId, setCardId] = useState('')
  const [customerId, setCustomerId] = useState('')

  const data = (localStorage.getItem('user'))
  const getData = JSON.parse(data)
  const email = getData.email

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const card = elements.getElement(CardElement);
      console.log(card);
      const result = (await stripe.createToken(card)).token;

      console.log(result);


      if (!stripe || !elements) {
        return
      }
      if (result.error) {
        console.log(result.error.message);
      } else if (result.token !== null || '') {
        const res = await axios.post("http://localhost:8000/api/create-customer", { email, result }, {
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
          }
        })
        console.log("assasaas", res);
        // setCardId(res?.data?.customer?.default_source)

        toast.success("card added")

      };
    } catch (error) {
      console.log(error);
    }
  }


  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      console.log(cardId, customerId);
      const card = elements.getElement(CardElement);
      const result = (await stripe.createToken(card)).token;
      console.log(result);
      const res = await axios.post(`http://localhost:8000/api/updateCard/`, { cardId, customerId, result, email }, {
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json'
        }
      });

      console.log(res);
      if (res.status === 200) {
        toast.success("card updated")
      }

    } catch (error) {
      console.log(error.message);
    }
  }





  const fetchCardData = async () => {
    try {

      console.log("jmcbjsc",);
      const response = await axios.get(`http://localhost:8000/api/getCard/${email}`)
      console.log(response);
      if (response?.data?.msg === true) {
        setCardData(response?.data?.card)
        setCardId(response?.data?.card?.id) 
        setCustomerId(response?.data?.card?.customer)
        setUpdate(response.data.msg)
        console.log("card", response);

      }

      else {
        console.log("get", response.data.msg);
        setUpdate(response.data.msg)

      }

    } catch (err) {
      console.error(err);
    }
  };


  // console.log(cardData);
  useEffect(() => {
    fetchCardData()
    console.log(cardData)
  }, [])

  return (
    <>
      <form className='w-50 mx-auto p-5 border shadow-lg mt-5 rounded-3 '>
        <h1 className='text-center mb-3'>Add Card</h1>
        <CardSection />
        {update === false ? <button disabled={!stripe} onClick={handleSubmit} className='btn btn-primary mt-3 fw-bolder'>Add New Card</button> : <button disabled={!stripe} onClick={handleUpdate} className='btn btn-info mt-3 fw-bolder'>Update Card</button>}

      </form>

      <div className="text-center mt-5  ">
        {
          cardData !== null ? <>
            <div className="main-card">

            </div>
          </> : <>
            Card Not Found
          </>
        }
      </div>


    </>
  );
}