const jwt = require("jsonwebtoken");

module.exports = (token) => {

    const privateKEY = "qmnwnmekjejohrfcgtlmknlkycxxdfxulkmnklnklnilkomncp";

    var i  = 'CyberGroup India Pvt. Ltd.';          // Issuer 
    var s  = 'User Auth';                           // Subject 
    var a  = 'someone@cygrp.com';                   // Audience

    var verifyOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn:  "12h",
        algorithm:  ["RS256"]
    };

    try{
        let verify = jwt.verify(token, privateKEY, verifyOptions);
        return(verify);
    }
    catch(error){
        return false;
    }
}