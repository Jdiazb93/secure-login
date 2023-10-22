const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Load Routes
const userRoutes = require('./router/users')

//Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

//Routes
app.use(`/api/v1`, userRoutes);


module.exports = app;