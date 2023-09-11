const {Schema , model} = require('mongoose');

const CommentSchema = Schema({
    idPublication:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:"Publication"
    },
    idUser:{
        type:Schema.Types.ObjectId,
        require:true,
        ref:"Usuarios"
    },
    comment: {
        type:String,
        trim: true,
        require: true,
    },
    createAt:{
        type:Date,
        default:Date.now(),
    }
})

module.exports = model('Comment', CommentSchema)