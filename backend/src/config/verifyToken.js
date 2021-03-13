//Authentication middleware

function verifyToken(req, res, next){
    const bearerToken = req.header('user');
    if(typeof bearerToken !== 'undefined'){
        req.token = bearerToken;
        next();  
    }else{
        res.send.sendStatus(403); //Forbidden req
    }
}

module.exports = verifyToken