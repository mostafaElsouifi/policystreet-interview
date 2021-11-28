const fetch = require('node-fetch');
const shoppe = require('../scripts/shoppe.js')
module.exports.homePage = async(req,res)=>{
    const response = await fetch('http://api.weatherapi.com/v1/current.json?key=b425506227934b86818152110212711&q=Malaysia&aqi=no');
    const weatherData = await response.json();
    res.render('index', {weatherData})
}


module.exports.search = async(req, res)=>{
    const response = await fetch('http://api.weatherapi.com/v1/current.json?key=b425506227934b86818152110212711&q=Malaysia&aqi=no');
    const weatherData = await response.json();
    let searchTerm = req.body.searchInput
    async function grabResult(){
        const result = await shoppe.scrapingScript(searchTerm)
        res.render('result', {result, weatherData})
    }
    try{
       
        await grabResult()
    }catch(e){
        await grabResult()
    }
    

   
}