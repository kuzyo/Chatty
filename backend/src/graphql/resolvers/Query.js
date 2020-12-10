import Mutation from "./Mutation";

const Query = {
  currentUser: (parent, args, context) => context.getUser(),
};

export default Query;

// module.exports = Query;
