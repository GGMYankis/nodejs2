const userController = require("../controllers/user");
const PublicationController = require("../controllers/publication");
const CommentController = require("../controllers/comment");
const LikeController = require("../controllers/like");

const resolver = {
  Query: {
    // User
    getUser: (_, { id, username }) => userController.getUser(id, username),
    countUser:(_,{}, ctx) => userController.countUser(ctx),
    getPublication: (_, { username }) =>
      PublicationController.getPublication(username),
    allPublication: () => PublicationController.allPublication(),
    getPublicationForMan: (_, { category }) =>
      PublicationController.getPublicationForMan(category),

    getComments: (_, { idPublication }) =>
      CommentController.getComments(idPublication),
    isLike: (_, { idPublication }, ctx) =>
      LikeController.isLike(idPublication, ctx),
    countLike: (_, { idPublication }, ctx) =>
      LikeController.countLike(idPublication),
    countComments: (_, { idPublication }) =>
      CommentController.countComments(idPublication),
  },

  Mutation: {
    //LOGIN Y REGISTRO DE USUARIO
    updateAvatar:(_,{file} , ctx) => userController.updateAvatar(file,ctx),
    createUser: (_, { input }) => userController.createUser(input),
    loginUser: (_, { input }) => userController.loginUser(input),

    //PUBLICACIONES DE IMAGENES
    publish: (_, { file, typeImg, price, name }, ctx) =>
      PublicationController.publish(file, typeImg, price, name, ctx),
    deletePublication: (_, { idPublication }, ctx) =>
      PublicationController.deletePublication(idPublication, ctx),

    //AGREGANDO COMENTARIOS A LA PUBLICACIONES
    addComment: (_, { input }, ctx) => CommentController.addComment(input, ctx),

    //AGREGANDO LOS LIKE

    addLike: (_, { idPublication }, ctx) =>
      LikeController.addLike(idPublication, ctx),
    deleteLike: (_, { idPublication }, ctx) =>
      LikeController.deleteLike(idPublication, ctx),
  },
};

module.exports = resolver;
