import passport from 'passport';

exports.resolver = {
    Query: {
        current: async (parent, args, { User, authenticatedUser }) => {
            console.log('printing authenticatedUser', authenticatedUser);

            // const userWithToken = passport.authenticate('facebook-token-ssdfsdf', (error, user, info) => {
            //     // const { user } = req;
            //     console.log('inside passport.authenticate : ', user);

            //     return user.toAuthJSON();
            // });
            // console.log('inside authenticate : ', userWithToken);
            // return userWithToken;
        }
    }
};
