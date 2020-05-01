const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const privateKEY = "qmnwnmekjejohrfcgtlmknlkycxxdfxulkmnklnklnilkomncp";

    var i  = 'CyberGroup India Pvt. Ltd.';          // Issuer 
    var s  = 'User Auth';                           // Subject 
    var a  = 'someone@cygrp.com';                   // Audience

    var token = req.header('Authorization');

    var verifyOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "12h",
        algorithm:  ["RS256"]
    };

    try{
        if(token == null){
            return res.status(401).send({
                success: false,
                payload: {
                    message: "No token attached to the request"
                }
            });
        }
        let verify = jwt.verify(token, privateKEY, (err, payload) => {
            if(err){
                return res.status(401).send({
                    success: false,
                    payload: {
                        message: "Error with token. Error -> " + err
                    }
                });
            }

            next();
        });
    }
    catch(error){
        return res.status(500).send({
            success: false,
            payload: {
                message: "Internal Server Error while verifiying token, Possible Reason -> "+error
            }
        });
    }
}