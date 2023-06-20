const express = require('express');
const app = express();
const PORT = 3301

app.use(express.json());

app.post('/', (req, res) => {
  const pinRegex = /^(?!.*(\d)\1{2})\d{6,}$/; //? 1-2
  const arrPin = req.body.pin.toString().split('');

  if (pinRegex.test(req.body.pin.toString())) {
    for (let i = 0; i < arrPin.length; i++) {
      if (parseInt(arrPin[i])+1 == arrPin[i + 1] 
        && parseInt(arrPin[i + 1])+1 == arrPin[i + 2]) {
          return res.send(`Fail`)
        }
      
      if (parseInt(arrPin[i])-1 == arrPin[i + 1]
        && parseInt(arrPin[i + 1])-1 == arrPin[i + 2]) {
          return res.send(`Fail`)
        }
    } //? 3

    let num = 0
    for (let i = 0; i < arrPin.length; i++) {
      if (arrPin[i] === arrPin[i + 1]) num++
    }
    return num > 2 ? res.send(`Fail`) : res.send(`Pass`) //? 4
  } else res.send(`Fail`)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})