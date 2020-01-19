const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://omnistackeyer:omnistackeyer@cluster0-2lp8f.mongodb.net/omnistack?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333,  () => console.log("listening..."));