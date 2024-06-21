import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CheckoutForm from './CheckoutForm'
import WrapEle from './WrapEle'

const CardDetails = () => {
    const navigate = useNavigate()

    return (
        <div>
            <form className='mt-5 mx-auto w-50 border border-2  p-5 rounded'>
                <h1 className='fs-1 text-center fw-bolder mb-5'>Card details</h1>
                <WrapEle />
            </form>
        </div>
    )
}

export default CardDetails