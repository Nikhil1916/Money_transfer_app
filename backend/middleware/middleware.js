const { JWT_SECRET } = require("../Config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(req.query);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.userId) {
            req.userId = decoded.userId;
            // console.log(decoded);
            next();
        } else {
            res.json({});
        }
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}