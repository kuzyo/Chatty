import Mutation from "./Mutation";
import { ObjectID } from "mongodb";

const Query = {
  currentUser: (parent, args, ctx) => {
    return ctx.req.user;
  },
  getUsers: (parent, args, ctx) => {
    return ctx.database.users.find({}).toArray();
  },
  getMessages: (parent, args, ctx) => {
    return ctx.database.messages.find({}).toArray();
  },
};

export default Query;
