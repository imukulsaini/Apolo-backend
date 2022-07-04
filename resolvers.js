const { gql } = require("apollo-server-express");

const { Blog } = require("./modals/blogs.modal");
const { User } = require("./modals/users.modal");
const { Bookmark } = require("./modals/bookmarks.modal");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getAllBlogs: async () => {
      const blogs = await Blog.find({})
        .populate("createdBy")
        .populate("bookmarkBy");
      return blogs;
    },
    getUserBookmark: async (parent, args, context, info) => {
      const { userId } = args;
      const bookmarks = await Bookmark.find({ userId: userId })
        .populate("userId")
        .populate("blogId");
      return bookmarks;
    },
    getUserData: async (parent, args, context, info) => {
      const { userId } = args;
      const userInfo = await User.findById(userId);
      return userInfo;
    },
  },

  Mutation: {
    createNewUser: async (parent, args, context, info) => {
      const { object, username, firstName, lastName, password } = args;

      const hashPassword = await bcrypt.hashSync(password, saltRounds);

      const user = await new User({
        object: "Users",
        username,
        firstName,
        lastName,
        password: hashPassword,
      });

      await user.save();
      return user;
    },
    loginUser: async (parent, args, context, info) => {
      let { username, password } = args;
      try {
        const isUserExist = await User.findOne({ username: username });
        if (isUserExist) {
          const isPasswordCorrect = await bcrypt.compare(
            password,
            isUserExist.password
          );

          if (isPasswordCorrect) {
            const userExludeSensitiveInfo = await User.findOne({
              username: username,
            })
              .populate("bookmarks")

              .select("-password");

            return userExludeSensitiveInfo;
          } else {
            throw new Error("Password Is not correct")
          }
        } else {
            throw new Error("User does not exist")

        }
      } catch (error) {
        throw new Error("Try Again")

      }
    },

    createNewBlog: async (parent, args, context, info) => {
      const { title, post, createdBy } = args;
      let savedBlog = await new Blog({
        object: "Blogs",
        title,
        post,
        createdBy,
        createdAt: new Date(),
      });

      await savedBlog.save();
      savedBlog = await savedBlog.populate("createdBy").execPopulate();

      return savedBlog;
    },

    createNewBookMark: async (parent, args, context, info) => {
      const { blogId, userId } = args;

      let savedBookmark = await new Bookmark({
        object: "Bookmark",
        blogId,
        userId,
      });
      const blog = await Blog.findById(blogId);
      blog.bookmarkBy.push(userId);
      await blog.save();
      savedBookmark = await savedBookmark
        .populate("userId")
        .populate("blogId")
        .execPopulate();

      await savedBookmark.save();
      return savedBookmark;
    },
    removeBookmark: async (parent, args, context, info) => {
      const { id } = args;
      const remove = await Bookmark.findByIdAndRemove(id);
      return true;
    },
  },
};

module.exports = { resolvers };
