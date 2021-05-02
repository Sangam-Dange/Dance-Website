const express = require("express");
const path = require('path');
const fs = require("fs");
const app = express();
const port = 8000;

const bodyparser = require("body-parser")// npm install body-parser//to save the body (object data) from post request 
const pug = require('pug');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

// Define moongose schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    
  });

  //creating instance of schema
const Contact = mongoose.model('contact', contactSchema);//model

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })); //to encode data from url to html 

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 

//endpoints

app.get('/', (req, res) => {
    const params = { }
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const params = { }
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);//created a new object and passed req.body because we want to save data that is in req box to our database
    myData.save().then(()=>{
       res.send("this items has been saved to database")
       //res.render("contact.pug");
       
    }).then(()=>{
        res.status(400).send("item was not saved to database")
    });

    //res.status(200).render('contact.pug');
});



app.listen(port, () => {
    console.log(`the application started on port ${port}`)
});
 