import Mutation from "./Mutation";

const Query = {
  currentUser: (parent, args, ctx) => ctx.req.user,
};

export default Query;
