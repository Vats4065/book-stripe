require('dotenv').config();
const stripe = require('stripe')('sk_test_51PRYHRLdUI6Jl6jNlRSgidkQczf0FNEfTLjKIqRAD1aMZEJMSwfOpAccuwWVU2RcHG7H4yyPkvHUp0gYydBhwJ1g00LGCU4PJn');
const cors = require('cors')
const express = require('express');
const db = require('./config/db');
const app = express();
const PORT = 8000
const route = require('./routes/routes')
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(__dirname + '/public/images'))


app.get('/', (req, res) => {
    res.send('done');
})

app.use('/api', route);

app.listen(PORT, () => {
    console.log('connected to server')
})