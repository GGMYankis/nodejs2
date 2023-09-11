const Publication = require("../models/publication");
const awsUploadImage = require("../utils/aws-upload-image");
const { v4: uuidv4 } = require("uuid");
const User = require('../models/user');


async function publish(file,typeImg , price , name , ctx) {
  const { id } = ctx.user;
  const { createReadStream, mimetype } = await file;
  

  const extension = mimetype.split("/")[1];
  const fileName = `publication/${uuidv4()}.${extension}`;
  const fileData = createReadStream(); 

   try {
    const result = await awsUploadImage(fileData, fileName);

   
    const publicationSave  = new Publication({
      idUser:id,
      file:result,
      type:mimetype.split("/")[0],
      price:price,
      name:name,
      typeImg:typeImg,
      createAt:Date.now(),
    })

      publicationSave.save();
    return {
      status: true,
      urlFile: result,
    };
  } catch (error) {
    return {
      status: null,
      urlFile: "",
    };
  } 
}

async function getPublication(username){

  const user = await User.findOne({username});

  if(!user)throw new Error("Usuario no encontrado");
  const publication = await Publication.find({idUser:user._id}).sort({createAt:-1});
  
  return publication;
}


async function deletePublication(idPublication , ctx){
    
try {
  const public = await Publication.findOneAndDelete({_id:idPublication})
  return true;

} catch (error) {
 return false 
}
    
}

async function allPublication(){
    const publications = await Publication.find().populate("idUser");
    return publications
}



async function getPublicationForMan(category){
   const publications = await Publication.find({typeImg:category});
  return publications 
}

module.exports = {
  publish,
  getPublication,
  deletePublication,
  allPublication,
  getPublicationForMan,
};
