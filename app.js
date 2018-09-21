import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import passport from 'passport';

import { ApolloServer } from 'apollo-server-express';
// import { makeExecutableSchema } from 'graphql-tools';
import glue from 'schemaglue';

import userSchema from './src/users/schema';
import passportFB from './src/config/passport';
import loginRoute from './src/users/login-routes';
import userContext from './src/users/user-context';
import auth from './src/users/auth';

// Configure Mongoose
mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost/passport-tutorial');
mongoose.set('debug', true);

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(loginRoute);
// app.use('/', auth.required);

if (!isProduction) {
    app.use(errorhandler());
}

const { schema, resolver } = glue('./src', { js: '**/resolver.js' });

const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
    context: ({ req, res }) => ({
        authenticatedUser: userContext(req)
        // ...userSchema
    }),
    // context: { ...userSchema, ...userContext },
    playground: {
        settings: {
            'editor.theme': 'light'
        }
    }
});

server.applyMiddleware({ app });

// Error handlers & middlewares
// if (!isProduction) {
//     app.use((err, req, res, next) => {
//         res.status(err.status || 500);

//         res.send({
//             errors: {
//                 message: err.message,
//                 error: err,
//             },
//         });
//     });
// }

// app.use((err, req, res, next) => {
//     res.status(err.status || 500);

//     res.send({
//         errors: {
//             message: err.message,
//             error: {},
//         },
//     });
// });


app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
