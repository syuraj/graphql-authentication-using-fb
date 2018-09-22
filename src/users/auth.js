import jwt from 'express-jwt';
import url from 'url';

const getTokenFromUrl = (req) => {
    const queryData = url.parse(req.url, true).query;

    return queryData.access_token;
};

const getTokenFromHeaderOrUrl = (req) => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }

    return getTokenFromUrl(req);
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaderOrUrl,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaderOrUrl,
        credentialsRequired: false,
    }),
};

module.exports = auth;
