const puppeteer = require('puppeteer');
const autoScroll = require('puppeteer-autoscroll-down');

const wait =  (sec)=>{
    return new Promise(resolve=>{
        setTimeout(resolve, sec * 1000)
    })
}
module.exports.homePage = (req,res)=>{

    res.render('index')
}

const scrapingScript = async(searchTerm)=>{
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    })
    const page = await browser.newPage();
    await page.setViewport({
        width: 1400,
        height: 1000,
        deviceScaleFactor: 1,
      });
      await page.exposeFunction("wait", wait)
      try{
        await page.goto('https://shopee.com.my/')
        await wait(3)
        await page.click('.shopee-searchbar-input__input')
        await page.type('.shopee-searchbar-input__input', searchTerm)
        await wait(3)
        await page.keyboard.press('Enter');
        await wait(3)
        await autoScroll(page)
        await wait(6)
        const data = await page.evaluate(async()=>{
            const allData = [];
            const allProducts = document.querySelectorAll('._3QUP7l')
            for(let i = 0; i < allProducts.length; i++){
                console.log(i)
                let productName = allProducts[i].querySelector('._5SSWfi.UjjMrh').textContent.trim();
                let price = allProducts[i].querySelector('._1d9_77').textContent
                let image = allProducts[i].querySelector('img').src;
                allData.push({
                        productName: productName,
                        price: price,
                        image: image
                    })
            }
            console.log(allData)
            return allData
    
        })
        await browser.close()
        return data;
      }catch(e){
          console.log(e)
          await browser.close()
      }

}
module.exports.search = async(req, res)=>{
    let searchTerm = req.body.searchInput
    async function grabResult(){
        const result = await scrapingScript(searchTerm)
        console.log(result)

        res.render('result', {result})
    }
    try{
       
        await grabResult()
    }catch(e){
        await grabResult()
    }
    

   
}