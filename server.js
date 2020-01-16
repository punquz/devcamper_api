const dotenv = require('dotenv');
const express = require('express');

//Route Files
const bootcamps = require('./routes/bootcamps');

//Load env var
dotenv.config({ path: './config/config.env' });

const app = express();

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 3000;

/*
==========================
Magic happens at port 3000
==========================
**/
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
