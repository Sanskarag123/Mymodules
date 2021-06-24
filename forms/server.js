//Server File  
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

const { connectTodb } = require('./connection');
const { adddetails } = require('./formfunct');

app.use(cors())
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.get('/',(req,res) => {
    res.send('Connected to app');
}) 
// Login route
app.post('/submitform', async ( req, res) => {
    let body = req.body;
    try{
        await adddetails(body);
        res.status(200).json({status: 'success',message: "Form submitted sucessfully"});
    } catch(err){
        res.status(400).send({message: err.message});
    }
})

app.listen(process.env.PORT || 4000,async () => {
await connectTodb();
console.log("Server listening in port "+ process.env.PORT || 4000);
});



module.exports = app;