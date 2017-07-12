const libs = require('../app/libs/users');
const User = require('../app/models/user');

const mongoose = require('mongoose');
const db = require('../config/database');

mongoose.connect(db.url);

const user = new User();
const password = user.generateHash('admin');


libs.save({
    name: 'admin',
    username: 'admin',
    password,
    role: 'admin',
})
.then(console.log)
.catch(console.log);
