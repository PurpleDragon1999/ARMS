const express = require('express');
const passport=require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();
const database = require('./database/config');
const passportSetup=require("./config/passport-setup");
const cookieSession=require('cookie-session');
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({origin: '*'}));
//set up routes
require('./routes/index')(app);
https.globalAgent.options.rejectUnauthorized = false;

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    
  }, app).listen(3000, () => {
    console.log('Listening...')
  })