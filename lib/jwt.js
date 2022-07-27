const jwt = require ('jsonwebtoken');

const generateToken = (address, polyjuiceAddress) => {
    return jwt.sign ({ address, polyjuiceAddress }, process.env.JWT_SECRET, { expiresIn: '72h' });
};

module.exports = generateToken;