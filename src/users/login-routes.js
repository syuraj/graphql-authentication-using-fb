import passport from 'passport';
import express from 'express';

const router = express.Router();

router.get('/authenticate',
    passport.authenticate('facebook-token'),
    (req, res) => {
        const { user } = req;
        return res.json({ user: user.toAuthJSON() });
    });

module.exports = router;
