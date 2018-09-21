// import jwt from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

// const userLookup = jwt({
//     secret: 'secret',
//     userProperty: 'payload',
//     getToken: getTokenFromHeaders,
// });

const userContext = (req) => {
    const token = getTokenFromHeaders(req);

    console.log('printing token ', token);

    const decoded = jsonwebtoken.verify(token, 'secret');

    console.log('printing decoded ', decoded);

    return { decoded };

    // // if (!user) {
    // //     throw new Error('You need to be authenticated to access this schema!');
    // // }
};

export default userContext;
