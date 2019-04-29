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

app.get('/cipher',(req,res)=>{
  const {text, shift} = req.query;
  let arr = text.toUpperCase().split('');
  let num = Number(shift);
  let numbers = arr.map((a)=>{
    let base = a.charCodeAt(0)+num;
    return (base >90 ? base-26:base)
  });
  let output = numbers.map(num=>String.fromCharCode(num)).join('');
  res.status(200).send(`Encoded text: ${output}`);
})