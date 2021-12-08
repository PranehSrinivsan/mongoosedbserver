require('dotenv').config()

const express = require('express');
const app=express();
const mongoose = require('mongoose');
const cors = require('cors') 

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error',(error) => console.error(error))
db.once('open', () => console.log('connected to Database'))

app.use(express.json())
app.use(cors())

const citiesRouter = require('./routes/cities.js')
app.use('/cities', citiesRouter)


app.get('/',(req,res) => {
    res.send('get route')
})

app.listen(5000,() => console.log('Runing Sucessfully...'))