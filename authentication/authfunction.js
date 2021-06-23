const bcrypt = require('bcrypt');
 require('dotenv').config()
const { userdb } = require('./connection') 
var jwt = require('jsonwebtoken');
let generateToken = async  (username) => {
    const payload = {
        username: username
    };
    let token = await jwt.sign(payload,'OTEMU');
    return token;
}
const login = async (body) => {
    const username = body.username;
    const password = body.password;
    try{
        let model = await userdb();
        let db_pass = await model.findOne({username:username},{password:1});
        console.log(db_pass)
        if(db_pass == null){
            throw new Error('Account does not exist');
        }
        db_pass = db_pass.password;
        let verify_pass = await bcrypt.compare(password,db_pass);
        console.log(verify_pass)
        if(!verify_pass){
            throw new Error('Wrong Username or Password');
        }
        return { status: 'success', message: { token: await generateToken(username), message: 'Login Successfull'}};
    } catch(err) {
        throw new Error(err.message);
    }
}
const createaccount = async (body) => {
    const username = body.username;
    const password = body.password;
    try{
        let model = await userdb();
        let db_pass = await model.findOne({username:username},{username:1});
        if(db_pass != null){
           throw new Error('Account already exists please login');
        }
        try{
        let salt = await bcrypt.genSalt(parseInt(process.env.saltrounds));
        let encryptedpass = await bcrypt.hash(password,salt);
        body.password = encryptedpass;
        let db_response = await model.insertOne(body);
        } catch(err){
            console.log(err);
            throw new Error('Creating account failed');
        }
    } catch(err) {
        throw err;
    }
}
module.exports = { login, createaccount}