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
app.get('/lotto',(req,res)=>{
  const {arr}=req.query;
  const numbers = arr.map(a=>Number(a));
  if(!arr){
    res.status(200).send('must have input')
  }
  if(arr.length<6){
      res.status(200).send('must have 6 numbers')
    }
  numbers.forEach(a=>{
      if(typeof a!=='number'){
        res.status(200).send('must be number')
      }
      if(a>20){
        res.status(200).send('must not greater than 20')
      }
    })
    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

    const winningNumbers = [];
    for(let i = 0; i < 6; i++) {
      const ran = Math.floor(Math.random() * stockNumbers.length);
      winningNumbers.push(stockNumbers[ran]);
      stockNumbers.splice(ran, 1);
    }
    const win=winningNumbers.filter(num=>numbers.includes(num));
    console.log(winningNumbers,win)
    // (`match ${win.length} numbers`);
    switch(win.length){
      case 6:
      res.status(200).send('Wow! Unbelievable! You could have won the mega millions!');
      case 5:
      res.status(200).send('Congratulations! You win $100!');
      case 4:
      res.status(200).send('Free Ticket');
      default:
      res.status(200).send('Sorry you lose');

    }
})
