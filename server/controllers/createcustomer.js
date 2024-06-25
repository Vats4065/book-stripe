

const Model = require('../models/registerSchema');


const stripe = require('stripe')('sk_test_51PRYHRLdUI6Jl6jNlRSgidkQczf0FNEfTLjKIqRAD1aMZEJMSwfOpAccuwWVU2RcHG7H4yyPkvHUp0gYydBhwJ1g00LGCU4PJn');

const createCustomer = async (req, res) => {

    const { email, result, } = req?.body
    try {
        const getEmailData = await Model.findOne({ email })
        if (getEmailData) {
            if (!getEmailData.cardId) {
                const customer = await stripe.customers.create({
                    email,
                    source: result?.id
                })
                const cardId = customer?.default_source
                await Model.updateOne({ email }, { $set: { cardId } })

                return res.json({ msg: true, customer }).status(200)
            }
            else {
                return res.json("already card exist").status(200)
            }

        }
        else {
            return res.json({ msg: "useNotFound" }).status(500)
        }

    }
    catch (err) {
        console.log("🚀 ~ createCustomer ~ err:", err)
        return res.json({ msg: err }).status(500)
    }
}


// const updateCard = async (req, res) => {
//     try {
//         const { customerId, cardId, result, email } = req.body

//         console.log("asaaasasasasss", customerId, cardId, result);
//         const updateByemail = await Model.findOne({ email })
//         console.log("updateByemail", updateByemail.cardId);
//         if (updateByemail.cardId === cardId) {

//             // const payment_Methods = await stripe.paymentMethods.list({
//             //      customerId,
//             //     cardId
//             // });
//             // console.log(payment_Methods);


//             // const paymentMethod = payment_Methods.data.find(method => method.card.id === cardId);

//             // console.log(paymentMethod);

//             // const paymentMethod = await stripe.paymentMethods.update(
//             //     'pm_1MqLiJLkdIwHu7ixUEgbFdYF',
//             //     {
//             //         metadata: {
//             //             order_id: '6735',
//             //         },
//             //     }
//             // );
//             return res.status(200).json({ msg: "updated" }, updateCard)

//         }
//         else {
//             return res.status(404).json({ msg: "" })
//         }

//     } catch (error) {

//     }

// }


const getCard = async (req, res) => {
    console.log("sasasasa", req.params);
    const { email } = req.params

    try {
        const findByEmail = await Model.findOne({ email })
        const cardId = findByEmail?.cardId
        if (cardId) {


            const card = await stripe.paymentMethods.retrieve(cardId);

            return res.json({ msg: true, card, update: true }).status(200)

        }
        else {
            return res.json({ msg: false, update: false }).status(500)
        }

    } catch (error) {
        console.log("🚀 ~ getCard ~ error:", error)
        return res.json({ msg: error.message }).status(500)
    }

}


const createPayment = async (req, res) => {
    try {

        const { price, title, email } = req.body
        const amount = Number(price) * 100

        const updateByemail = await Model.findOne({ email })
        if (updateByemail.cardId) {
            const cardCustomer = await stripe.paymentMethods.retrieve(updateByemail.cardId);


            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'inr',
                customer: cardCustomer.customer,
                payment_method_types: ['card'],
                payment_method: updateByemail.cardId,
                description: title,
                confirm: true,
                return_url: 'http://localhost:3000/success',
            });


            // const charge = await stripe.charges.create({
            //     amount,
            //     currency: 'inr',
            //     source: updateByemail.cardId,
            //     customer:cardCustomer.customer
            //   });

            return res.json({ msg: paymentIntent }).status(200)
        }
        else {
            return res.json({ msg: "noCard" }).status(500)
        }

    } catch (error) {
        console.log(error);
        return res.json({ msg: error.message }).status(500)

    }
}














module.exports = { createCustomer, getCard, updateCard, createPayment }