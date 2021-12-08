const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
    name: String,
    hotelimageurl: String,
    location_url: String
})

const CitiesSchema = new mongoose.Schema({

    name: String,
    hotels:[hotelsSchema]
       
})
   
module.exports = mongoose.model('City',CitiesSchema)