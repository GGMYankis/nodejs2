const {Schema, model } = require('mongoose');

const userSchema = Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    avatar:String,
    rol:String
})

module.exports = model('Usuarios' , userSchema);

