require('dotenv').config();
const cors = require('cors')
const express = require('express');
const db = require('./config/db');
const app = express();
app.use(cors())
const PORT = 8000
const route = require('./routes/routes')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


app.get('/', (req, res) => {
    res.send('done');
})

app.use('/api', route);

app.listen(PORT, () => {
    console.log('connected to server')
})