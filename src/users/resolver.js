
exports.resolver = {
    Query: {
        current: async (parent, args, { User, userContext }) => {
            console.log('printing userContext', userContext);

            const user = await User.findOne({ _id: userContext.id });

            return user;
        }
    }
};
