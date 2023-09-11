const {Schema , model} = require("mongoose");


const PublicationSchema = Schema({
    idUser:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:"Usuarios"
    },
    typeImg:{
        type:String,
        require:true
    },
    price:{
      type:Number,
      require:true
    },
    name:{
        type:String,
        require:true
    },
    file:{
        type:String,
        require:true
    },
    typeFile:{
        type:String,
        trim:true
    },
    timestamp:{
        type:Date,
        default:Date.now(),
    }
})

module.exports = model('Publication', PublicationSchema)