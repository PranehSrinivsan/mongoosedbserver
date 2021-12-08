const express = require('express');
const router = express.Router();
const City = require('../models/city');

//Get all
router.get('/',async (req,res) =>{
    try{
        const cities = await City.find();
        res.json(cities)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

//Get one
router.get('/:id',getCity,(req,res) =>{
    res.send(res.city)
})

//get hotels for city
router.get('/hotels/:id',getCity,(req,res) =>{
    res.json(res.city.hotels)
})

//Put one
router.post('/',async(req,res) =>{
    const cities = new City({
        name: req.body.name,
        hotels: req.body.hotels,
        hotelname: req.body.hotels.name,
        hotelimageurl: req.body.hotels.hotelimageurl,
        location_url: req.body.hotels.location_url,
    })
    try{
        const newCity = await cities.save();
        res.status(201).json(newCity)
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

//post url
router.post('/create/:cityname/:hotelname/:hotelimageurl/:location_url',async(req,res) =>{
    const cities = new City({
        name: req.params.cityname,
        hotels:[{
            name: req.params.hotelname,
            hotelimageurl: req.params.hotelimageurl,
            location_url: req.params.location_url,
        }]
    })
    try{
        const newCity = await cities.save();
        res.status(201).json(newCity)
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

//patch raw data
router.patch('/:id',getCity,async (req,res) =>{
    if(req.body.name != null){
        res.city.name = req.body.name
        res.city.hotels = req.body.hotels
        res.city.hotels.hotelname = req.body.hotels.name
        res.city.hotels.hotelimageurl = req.body.hotels.hotelimageurl
        res.city.hotels.location_url = req.body.hotels.location_url
    }
    try{
        const updatedCity = await res.city.save()
        res.status(201).json(updatedCity)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

//patch URL
router.patch('/:id/:name/:index/:hotelname/:hotelimageurl/:location_url',getCity,async (req,res) =>{
        let i=req.params.index
        res.city.name = req.params.name
        res.city.hotels[i].name = req.params.hotelname
        res.city.hotels[i].hotelimageurl = req.params.hotelimageurl
        res.city.hotels[i].location_url = req.params.location_url
    try{
        const updatedCity = await res.city.save()
        res.status(201).json(updatedCity)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})

router.delete('/:id',getCity,async (req,res) =>{
    try{
        await res.city.remove();
        res.status(201).json({message: 'City deleted'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


async function getCity(req,res,next){
    let cities
    try{
        cities = await City.findById(req.params.id);
        if(cities == null){
            return res.status(404).json({message : 'Cannot find city'})
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    res.city = cities
    next()
}

module.exports = router;