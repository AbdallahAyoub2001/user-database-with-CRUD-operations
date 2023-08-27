const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'secret-key';

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const generateJWTToken = (userId, email) => {
    return jwt.sign({ userId, email }, secretKey, { expiresIn: '1h' });
};

const verifyUser = (req, res, next) => {
    // const token = req.query.secret_token;
    const token = req.header('Authorization');
    // console.log(token); // if you use the authorization section with Bearer token type use: .split(' ').at(1)

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalid or expired' });
        }
        if (!decoded.userId || !decoded.email) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }
        req.user = decoded; // Attach user information to the request
        next();
    });
};

// how to check if the user is signed in when he tries to get to specific pages, because the token may be valid while the user has logged out.

module.exports = {
    hashPassword,
    comparePasswords,
    generateJWTToken,
    verifyUser,
};
