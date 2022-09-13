const mongoose = require('mongoose');


let Schema = mongoose.Schema;

const urlSchema = Schema({
    url: String,
    to: String,
    ips: Array,
    count: Number,
    user: String
},{ versionKey: false });

const userSchema = Schema({
    email: String,
    password: String,
    urls: [String],
    token: String
},{ versionKey: false });


const urls = mongoose.model('urls', urlSchema);

const users = mongoose.model('users', userSchema);

module.exports.urls = urls;
module.exports.users = users;
