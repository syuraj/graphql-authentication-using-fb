import jsonwebtoken from 'jsonwebtoken';

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const getUserContext = (req) => {
    const token = getTokenFromHeaders(req);

    if (!!token) {
        const userContext = jsonwebtoken.verify(token, 'secret');

        console.log('printing decoded ', userContext);

        return { userContext };
    }

    return { userContext: { status: 'Unauthorized' } };
};

export default getUserContext;
