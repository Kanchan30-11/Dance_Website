const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require ("body-parser")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Dance-Website')
  console.log("we are connected :");}
const path =require('path');
const port = 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact= mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) // for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view-engine','pug')//set the template engine pug
app.set('views',path.join(__dirname,'views'))//set the views directory

//ENDPOINTS
app.get('/',(req,res) =>{
    const params = {}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res) =>{
    const params = {}
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res) =>{
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("this data has been saved to the database")
    }).catch(() =>{
        res.status(400).send('data was not saved to the database');
    })
    })
 

    
// START THE SERVER
app.listen(port, () => {
    console.log(`the application has started successfully on port ${port} `)
}) 