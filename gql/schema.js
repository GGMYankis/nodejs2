const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    email: String
    password: String
    avatar: String
    rol:String
  }
  type Comment {
    idPublication: ID
    idUser: User
    comment: String
    createAt: String
  }
  input UserInput {
    email: String
    username: String
    password: String
  }
  input LoginInput {
    username: String!
    password: String!
  }

  input CommentInput {
    idPublication: ID
    comment: String
  }

  type Token {
    token: String
  }

  type Publish {
    status: Boolean
    urlFile: String
  }

  type Publication {
    id: ID
    idUser: ID
    file: String
    typeFile: String
    createAt: String
    price:String
    name:String
    typeImg:String

  }

  type AllPublication {
    id: ID
    idUser: User
    file: String
    typeFile: String
    createAt: String
    price:String
    name:String
    typeImg:String
  }
  
  type UpdateAvatar {
    status: Boolean
    urlAvatar: String
  }

  type Query {
   
     #Users
     getUser(id: ID, username: String): User
     countUser:Int

    #Publication
    getPublication(username: String!): [Publication]
    allPublication:[AllPublication]
    getPublicationForMan(category:String!):[Publication]

    # Opteniendo los comentarios
    getComments(idPublication: ID!): [Comment]
    countComments(idPublication: ID!): Int

    #Like
    isLike(idPublication: ID!): Boolean
    countLike(idPublication: ID!): Int
  }

  type Mutation {

    #User
    
    updateAvatar(file:Upload):UpdateAvatar

    #Login y Registro de Usuarios
    createUser(input: UserInput): User
    loginUser(input: LoginInput): Token

    #Publicaciones de imagenes
    publish(file: Upload , typeImg:String ,  price:String , name:String): Publish
    deletePublication(idPublication:ID!):Boolean

    #Comentarios a la publicaciones
    addComment(input: CommentInput): Comment

    addLike(idPublication: ID!): Boolean
    deleteLike(idPublication: ID): Boolean

    
  }
`;

module.exports = typeDefs;
