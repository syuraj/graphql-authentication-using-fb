import mongoose from 'mongoose';
import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

const Users = mongoose.model('Users');

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET
}, (accessToken, refreshToken, profile, done) => {
    Users.findOrCreate(
        { facebookId: profile.id },
        { name: profile.displayName, pictureUrl: profile.photos[0].value },
        (error, user) => done(error, user)
    );
}));

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

export default passport;
