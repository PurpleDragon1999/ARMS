const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const privateKEY = "qmnwnmekjejohrfcgtlmknlkycxxdfxulkmnklnklnilkomncp";

    var i  = 'CyberGroup India Pvt. Ltd.';          // Issuer 
    var s  = 'User Auth';                           // Subject 
    var a  = 'someone@cygrp.com';                   // Audience

    var token = null;

    var verifyOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "12h",
        algorithm:  ["RS256"]
    };

    try{
        if(token == null){
            res.status(401).send({
                success: false,
                payload: {
                    message: "No token attached to the request"
                }
            });
        }
        let verify = jwt.verify(token, privateKEY, verifyOptions);
        if(verify == true){
            next();
        }
    }
    catch(error){
        res.status(500).send({
            success: false,
            payload: {
                message: "Internal Server Error while verifiying token"
            }
        });
    }
}