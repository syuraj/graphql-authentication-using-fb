import mongoose from 'mongoose';
import passport from 'passport';
import express from 'express';
// import auth from '../auth';

const router = express.Router();
// const Users = mongoose.model('Users');

router.get('/authenticate',
    passport.authenticate('facebook-token'),
    (req, res) => {
        const { user } = req;

        console.log('printing user from request', user);

        // user.token = user.generateJWT();

        return res.json({ user: user.toAuthJSON() });
    });

// // GET current route (required, only authenticated users have access)
// router.get('/current', auth.required, (req, res, next) => {
//     const { payload: { id } } = req;

//     return Users.findById(id)
//         .then((user) => {
//             if (!user) {
//                 return res.sendStatus(400);
//             }

//             return res.json({ user: user.toAuthJSON() });
//         });
// });

module.exports = router;
