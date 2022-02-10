const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
  res.send('Hello World!!!!'));

//connect mongoDB


const PORT = 4000;
app.listen(PORT);
