import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CheckoutForm({ customerId }) {
  const stripe = useStripe();
  const elements = useElements();

  // const [token, setToken] = useState({})
  // const [customers, setCustomers] = useState([]);
  const data = (localStorage.getItem('user'))
  const getData = JSON.parse(data)
  const email = getData.email




  // const [cardData, setCardData] = useState(null);

  // const fetchCardData = async () => {
  //   try {
  //     const response = await axios.get(`/api/customer/${customerId}/cards`);
  //     setCardData(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  // useEffect(()=>{fetchCardData()},[])









  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const card = elements.getElement(CardElement);
      const result = await (await stripe.createToken(card)).token;
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
        console.log(res);
        localStorage.setItem('customer_stripe_id', res?.data?.customer?.id)
        toast.success("card added")


      };
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='w-50 mx-auto p-5 border shadow-lg mt-5 rounded-3 '>
        <h1 className='text-center mb-3'>Add Card</h1>
        <CardSection />
        <button disabled={!stripe} className='btn btn-primary mt-3 fw-bolder'>AddNewCard</button>
      </form>

      {/* {cardData && (
        <div>
          <h2>Card Data:</h2>
          <pre>{JSON.stringify(cardData, null, 2)}</pre>
        </div>
      )} */}


    </>
  );
}