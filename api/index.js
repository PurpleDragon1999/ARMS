const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const database = require('./database/config');

app.use(bodyParser.json());

app.use(cors({origin: '*'}));

require('./routes/index')(app);

app.listen(3000, () =>{
    console.log("Listening port 3000");
});