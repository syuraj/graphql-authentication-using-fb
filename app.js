import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import passport from 'passport';

import Users from './models/Users';
import passportLocal from './config/passport';
import routes from './routes';

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(routes);

if (!isProduction) {
    app.use(errorhandler());
}

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-tutorial');
mongoose.set('debug', true);

//Error handlers & middlewares
if (!isProduction) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);

        res.send({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.send({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));