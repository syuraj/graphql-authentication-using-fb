import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import FacebookTokenStrategy from 'passport-facebook-token';

const Users = mongoose.model('Users');

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET
}, function (accessToken, refreshToken, profile, done) {
    Users.findOrCreate(
        { facebookId: profile.id },
        { name: profile.displayName, pictureUrl: profile.photos[0].value },
        function (error, user) {
            return done(error, user);
        });
}
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});