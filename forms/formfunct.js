const schema = require('./formmodel');
const { userdb } = require('./connection')
const adddetails = async (body) => {
    let is_valid = schema.isValid(body);
   try{
        if(!is_valid){
            throw new Error('Invaid form format');
        }
        body = schema.cast(body);
        let response = userdb.insertOne(body);
   } catch(err){
       throw err;
   }
}
module.exports = { adddetails};