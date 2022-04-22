// const http = require('http');
const express = require('express');
const {getTasks} = require('./helpers/get_tasks');
require('dotenv').config();

const app = express();

const {PORT, HOSTNAME} = process.env;

app.get('/',getTasks);



app.listen(PORT,HOSTNAME, () =>{
    console.log(`Server runnint at http://${HOSTNAME}:${PORT}`);
});