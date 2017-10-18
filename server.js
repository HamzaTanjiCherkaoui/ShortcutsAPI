const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('bodyParser');

const app = express();

const port = 8000;

app.listen(port , ()=> {
	console.log(`we are live on {$port}`);
})