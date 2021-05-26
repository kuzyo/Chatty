const Subscription = {
  messageSent: {
    subscribe: (root, args, ctx) => {
      return ctx.pubsub.asyncIterator("MESSAGE_CHANNEL");
    },
  },
};

export default Subscription;
