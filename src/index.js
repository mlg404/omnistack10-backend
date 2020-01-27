const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const { setupWebsocket } = require('./websocket')

require('dotenv').config();

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT,  () => console.log("listening..."));