// const http = require('http');
const express = require('express');
const {getTasks} = require('./helpers/get_tasks');
require('dotenv').config();
const cors = require('cors');



const app = express();

const whitelist = ["http://localhost:3030"]

const corsOptions = {

  origin: function (origin, callback) {

    if (!origin || whitelist.indexOf(origin) !== -1) {

      callback(null, true)

    } else {

      callback(new Error("Not allowed by CORS"))

    }

  },

  credentials: true,

}

app.use(cors(corsOptions))

const {PORT, HOSTNAME} = process.env;

app.get('/',getTasks);



app.listen(PORT,HOSTNAME, () =>{
    console.log(`Server runnint at http://${HOSTNAME}:${PORT}`);
});