import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';


const WrapEle = () => {


    // Make sure to call `loadStripe` outside of a component's render to avoid
    // recreating the `Stripe` object on every render.
    const stripePromise = loadStripe('pk_test_51PRYHRLdUI6Jl6jN63VaLY10xionOYbfC9Ym8VPzGlZOIBUIdQU2E4GxHXLeCFoeAGM6yIgZe9kdxaAuXdZQe4s100Hk9PHv8g');
    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    )
}

export default WrapEle