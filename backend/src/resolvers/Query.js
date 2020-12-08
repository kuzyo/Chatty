const Query = {
  me(parent, args, ctx, info) {
    console.log("----------");
    console.log(ctx.req.user);
    console.log("----------");

    // console.log(ctx.req.user);
    return "me";
  },
};

module.exports = Query;
