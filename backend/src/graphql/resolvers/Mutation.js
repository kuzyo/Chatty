const Mutation = {
  logout: (parent, args, ctx) => ctx.req.logout(),
};

export default Mutation;
