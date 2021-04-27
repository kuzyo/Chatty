const Mutation = {
  logout: (parent, args, ctx) => ctx.req.logout(),
  createMessage: async (parent, args, ctx) => {
    try {
      const { ops } = await ctx.database.messages.insertOne({
        ...args,
        createdAt: Date.now(),
        from: ctx.req.user.googleId,
      });
      const [message] = ops;
      return message;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  },
};

export default Mutation;
