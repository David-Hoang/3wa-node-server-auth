import 'dotenv/config';
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyUser = async (req,res,next) => {

    const token = req.headers.authorization;
    try {
        if(!token){
            return res.status(401).json({ message : 'Token is missing, access denied.'})
        }

        const verifyToken = jwt.verify(token.split(" ")[1], JWT_SECRET);

        if(!verifyToken){
            return res.status(401).json({ message : 'Token is invalid, access denied.'})
        }else {
            req.user = verifyToken;
            next()
        }

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: "Invalid token : incorrect signature" });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: "Token expired, please login again" });
        }
        return res.status(500).json({ error: "Error while verifating the token" });
    }

}