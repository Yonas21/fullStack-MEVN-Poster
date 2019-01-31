/*eslint-disable*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const configdb = require ('./dbConfig');
const postRoute = require('./post.route');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(configdb.DB, {useNewUrlParser: true}).then(()=> {
    console.log("database is Connected.")
},error => {
    console.log('cannot connect to database') + error});

//define the router in the server side
app.use('/posts', postRoute);
app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});