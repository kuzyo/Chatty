const Subscription = {
  messageSent: {
    subscribe: (root, args, { pubsub }) => {
      return pubsub.asyncIterator(CHAT_CHANNEL);
    },
  },
};

export default Subscription;
