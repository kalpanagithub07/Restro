const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const collection = require('./mongodb')

const tempPath = path.join(__dirname, '../templates')
app.use('/public', express.static(path.join(__dirname, '/../public')))  //very important line to load css and images from correct path 

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempPath)  //changing folder name from views to template folder (if folder name is views, no need to do this)
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.render("login")
})

app.get('/login', (req, res) => {
    res.render("login")
})



app.get('/signup', (req, res) => {
    res.render("signup")
})

// app.get('/login', (req, res) => {
//     res.render("login")
// })

app.post("/signup", async (req, res) => {   //same as form action

    const data = {
        name : req.body.name,
        password : req.body.password
    }

    await collection.insertMany([data])

    res.render("home")
}) 

app.post("/login", async (req, res) => {   //same as form action

    try{
        const check = await collection.findOne({name:req.body.name})

        if(check.password === req.body.password) {
            res.render('home')
        }
        else{
            res.send("Wrong password")
        }
    }
    catch{
        res.send("wrong details")

    }
}) 

const PORT = 6080;

app.listen(PORT, () => {
    console.log(`Port connected at ${PORT}`);
});