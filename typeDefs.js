const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    object: String
    _id: String
    firstName: String
    lastName: String
    username: String
    bookmarks: [Bookmark]
  }

  type Blog {
    object: String
    _id: String
    title: String
    post: String
    createdBy: User
    createdAt: String
    bookmarkBy: [User]
  }

  type Bookmark {
    object: String
    _id: String
    userId: User
    blogId: Blog
  }

  type Query {
    hello: String
    getAllBlogs: [Blog]
    getUserBookmark(userId: String): [Bookmark]
    getUserData(userId: String): User
  }

  type Mutation {
    loginUser(username: String, password: String): User
    createNewUser(
      firstName: String
      lastName: String
      username: String
      password: String
    ): User

    createNewBlog(title: String, post: String, createdBy: String): Blog

    createNewBookMark(blogId: String, userId: String): Bookmark

    removeBookmark(id: String): Boolean
  }
`;

module.exports = { typeDefs };
