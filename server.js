const dotenv = require('dotenv');
const express = require('express');

//Load env var
dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 3000;

/*
==========================
Magic happens at port 3000
==========================
**/
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
