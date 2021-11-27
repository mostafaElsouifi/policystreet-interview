const shoppe = require('../scripts/shoppe.js')
module.exports.homePage = (req,res)=>{

    res.render('index')
}


module.exports.search = async(req, res)=>{
    let searchTerm = req.body.searchInput
    async function grabResult(){
        const result = await shoppe.scrapingScript(searchTerm)
        res.render('result', {result})
    }
    try{
       
        await grabResult()
    }catch(e){
        await grabResult()
    }
    

   
}