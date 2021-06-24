const yup = require('yup')
const forschema = new yup.ObjectSchema({
    first_name: yup.string()
});
module.exports = forschema;