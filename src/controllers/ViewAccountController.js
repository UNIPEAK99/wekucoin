const ViewAccountController = {
    index: async function(ctx) {
      const account = ctx.query.account;
        await ctx.render('viewAccount/index', {
            title: 'View Account',
            account: account
        });
    },


};

module.exports = ViewAccountController;
