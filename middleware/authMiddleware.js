import jwt from 'jsonwebtoken';

const authMiddleware = async(req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1];
        //console.log("authtoken", token)
        const isCustomAuth = token.length < 500;
        
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'testSecret');
            req.userId = decodedData?.id; 
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        
    }
}

export default authMiddleware;