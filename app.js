'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('dev'));

//This is the final request handler
app.get('/sum', (req, res) => {
  console.log(req.query);
  const {a,b} = req.query;
  let aNumber = Number(a);
  let bNumber = Number(b);
  const sum = aNumber+bNumber;
  
  console.log(aNumber,bNumber);
  res.status(200).send(`The sum of ${aNumber} + ${bNumber} is ${sum}`);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});