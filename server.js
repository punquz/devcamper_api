const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const color = require('colors');
const connectDB = require('./config/db');

//Load env var
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

//Route Files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 3000;

/*
==========================
Magic happens at port 3000
==========================
**/
const server = app.listen(
  PORT,
  console.log('App listening on port 3000!'.yellow.bold)
);

//handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
