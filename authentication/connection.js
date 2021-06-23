//Connection File
 require('dotenv').config()
const MongoClient = require( 'mongodb' ).MongoClient;
const url = process.env.DB_URL;
let _db;
let connection;
const connectTodb = async () => {
try{
     _db = await  MongoClient.connect( url,  { useNewUrlParser: true,useUnifiedTopology:true }) ;
    connection = await _db.connect();
    connection = await connection.db('auth').collection('users');
    console.log('Connected to database')
}
catch(err){
    console.log(err.message);
}
}



let userdb = async () => {
    try {
        return connection;
    } catch( err ){
        throw err;
    }
}


module.exports = {connectTodb,userdb};