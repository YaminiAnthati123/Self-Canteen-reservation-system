// Auth Verification Middleware
const jwt = require("jsonwebtoken");


const verifyAccess = async (req, res, next) => {
    // making sure we have the token
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            message: "Access Deined!"
        });
    }

    if (!req.headers["authorization"].split(" ")[1]) {
        return res.status(403).json({
            message: "missing credentials!"
        });
    }

    try {
        // removing Bearer keyword
        const refinedToken = req.headers["authorization"].split(" ")[1];

        // verifying jwt token
        const decodedToken = jwt.verify(refinedToken, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(403).json({
                message: "Failed to verify identity please try again later."
            });
        }

        // attaching decoded user details with request object
        req.user = decodedToken;

        // allow futhur execution
        next();
    } catch(e) {
        if (e instanceof jwt.JsonWebTokenError) {
            console.log(`REASON: ${e.message}`);
            
            return res.status(403).json({
                message: "Access Forbidden!"
            });
        }

        return res.status(403).json({
            message: "Access Denied!"
        });
    }
}


module.exports = verifyAccess;

