const express = require('express');
const app = express();
const path = require('path')

const router = require('./routes/router')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)




app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is running')
})