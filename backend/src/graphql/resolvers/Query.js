import Mutation from "./Mutation";

const Query = {
  currentUser: (parent, args, ctx) => ctx.req.user,
  getUsers: (parent, args, ctx) => {
    const users = ctx.database.users.find({}).toArray();
    return users;
  },
};

export default Query;
