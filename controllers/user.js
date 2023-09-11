const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
require("dotenv").config({ path: ".env" });
const awsUploadImage = require("../Utils/aws-upload-image");

async function createToken(user, SECRET_KEY, expiresIn) {
  const { username, email, id } = user;

  const payload = {
    id,
    username,
    email,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function createUser(input) {
  const newUser = input;

  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const { username, password, email } = newUser;

  const userFound = await User.findOne({ username });
  if (userFound) throw new Error("El nombre de usuario  ya esta en uso");

  const emailFound = await User.findOne({ email });
  if (emailFound) throw new Error("El email ya esta en uso");

  const salt = await bcryptjs.genSaltSync(10);
  newUser.password = await bcryptjs.hash(password, salt);

  newUser.rol = "administrador";

  const saveUser = User(newUser);
  await saveUser.save();



  return saveUser;
}

async function loginUser(input) {
  const { username, password } = input;

  const userFound = await User.findOne({ username: username.toLowerCase() });
  if (!userFound) throw new Error("Credenciales incorrectas");

  const passwordSucess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSucess) throw new Error("Credenciales incorrectas ");

  const { email, id  , rol} = userFound;
  const payload = {
    id,
    username: userFound.username,
    email,
    rol
  };
  const expiresIn = "24";

  return { token: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn }) };
}

async function countUser(ctx) {
  const users = User.countDocuments();
  return users;
}

async function updateAvatar(file, ctx) {
  const { id } = ctx.user;
  const { createReadStream, mimetype } = await file;

  const extension = mimetype.split("/")[1];
  const imageName = `avatar/${id}.${extension}`;
  const fileData = createReadStream();
  try {
    const result = await awsUploadImage(fileData, imageName);

    const user = await User.findByIdAndUpdate(id, { avatar: result });

    return {
      status: true,
      urlAvatar: result,
    };
  } catch (error) {
    return {
      status: false,
      urlAvatar: null,
    };
  }
}
async function getUser(id, username) {
  let user = null;
  if (id) user = await User.findById(id);
  if (username) user = await User.findOne({ username });

  if (!user) throw new Error("El usuario no existe");
  return user;
}

module.exports = {
  createUser,
  loginUser,
  countUser,
  updateAvatar,
  getUser,
};
