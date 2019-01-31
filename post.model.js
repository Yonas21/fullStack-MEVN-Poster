/*eslint-disable*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//definition of collection and schema for post
let post = new Schema({
        title: {
            type: String
        },
        body: {
            type: String
        }
        },
    {
        collection: 'posts'
    }

);
module.exports = mongoose.model('Post',post);