const stripe = require('stripe')('sk_test_51PRYHRLdUI6Jl6jNlRSgidkQczf0FNEfTLjKIqRAD1aMZEJMSwfOpAccuwWVU2RcHG7H4yyPkvHUp0gYydBhwJ1g00LGCU4PJn');

const createCustomer = async (req, res) => {

    const { email, result } = req?.body
    console.log(req?.body);
    try {
        const customer = await stripe.customers.create({
            email,
            source: result?.id

        })




        return res.status(200).json({ msg: "customer", customer, result })
    }
    catch (err) {
        return res.json({ msg: err }).status(500)
    }
}


const getCard = async (req, res) => {
    console.log(req.query);
    const { email } = req.query;

    try {
        const customers = await stripe.customers.retrieve(email);
        return res.json(customers.data).status(200)
    } catch (error) {
        console.error('Error fetching customers:', error);
        return res.status(500).json({ error: 'Failed to fetch customers' ,error});
    }
}










module.exports = { createCustomer, getCard }