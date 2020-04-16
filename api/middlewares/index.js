const tokenGenerator = require('./tokenGenerator');
const tokenVerifier = require('./tokenVerifier');
const tokenDecoder = require('./tokenDecoder');

module.exports = {
    tokenGenerator: tokenGenerator,
    tokenVerifier: tokenVerifier,
    tokenDecoder: tokenDecoder
};