//Server File  
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const Schemas = require('./authmodel');
const { login,create, createaccount } = require('./authfunction');
const { connectTodb } = require('./connection');


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
app.post('/login',async (req,res,next) => {
        try{
        let body = req.body;
        let vaerification = await Schemas.loginschema.isValid(body);
        if(!vaerification){
            throw new Error('Login details are invalid');
        }
        let response = await login(body);
        res.status(200).json(response);
        } catch(err){
            res.status(400).json({message:err.message});
        }
});
app.post('/signup', async (req,res) => {
    let body = req.body;
    try{
        let verify_data = await Schemas.caschema.isValid(body);
        if(!verify_data) {
            throw new Error('Invalid data format');
        }
        body = await Schemas.caschema.cast(body);
        let acc = await createaccount(body);
        res.json({status:'success',message:"Signup Sucessfull"});
    } catch(err){
        if(err.message === 'Creating account failed') {
            res.status(500).send({message: err.message});
        } else {
            res.status(400).send({message:err.message});
        }
    }
})


app.listen(process.env.PORT || 4000,async () => {
await connectTodb();
console.log("Server listening in port "+ process.env.PORT || 4000);
});



module.exports = app;