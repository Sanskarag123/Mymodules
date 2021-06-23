const yup =  require('yup');

const createacount = new yup.ObjectSchema({
    username: yup.string().required("User name is required Field"),
    password: yup.string().required("Password is required")
});
const login = new yup.ObjectSchema({
    username: yup.string().required("User name is required Field"),
    password: yup.string().required("Password is required")
});
module.exports = { caschema: createacount, loginschema: login};