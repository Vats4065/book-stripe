import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// async function stripeTokenHandler(token) {
//   const paymentData = { token: token.id };


//   const response = await fetch('/charge', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(paymentData),
//   });
//   console.log(response);

//   return response.json();
// }
export default function CheckoutForm() {
  const navigate = useNavigate()


  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);


    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);


    }
    else {

      // console.log(cardNumber);
      const createCustomer = async () => {

        try {
          const getItem = localStorage.getItem("user")
          const user = JSON.parse(getItem)
          const cardNumber = result?.token?.card?.last4;
          const cardExpMonth = result?.token?.card?.exp_month;
          const customerName = user?.name
          const customerEmail = user?.email
          const cardExpYear = result?.token?.card?.exp_year;
          console.log(user);
          const customer = await stripe.customers.create({
            name: customerName,
            email: customerEmail,
          });

          const paymentMethod = await stripe.paymentMethods.create({
            type: "card",
            card: {
              number: cardNumber,
              exp_month: cardExpMonth,
              exp_year: cardExpYear,
              cvc: result?.token?.card?.cvc,
            }
          })
          await stripe.paymentMethods.attach(paymentMethod?.id, {
            customer: customer?.id,
          });
          toast.success("Card saved successfully")
        }
        catch (err) {
          console.log(err);
        }
        // navigate("/")
      }
      createCustomer(); 
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-50 mx-auto mt-5 p-5 border rounded shadow-lg'>
        <CardSection />
        <button className='btn btn-primary mt-5 shadow' disabled={!stripe}>Confirm order</button>
      </form>
    </>
  );
}