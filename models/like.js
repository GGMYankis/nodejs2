const { Schema, model } = require("mongoose");

const LikeSchema = Schema({
  idPublication: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Publication",
  },
  idUser:{
    type: Schema.Types.ObjectId,
     require:true,
     ref:"Usuario"
  }
});

module.exports = model("LikeSchema", LikeSchema);
