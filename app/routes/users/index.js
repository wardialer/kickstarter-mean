const authorizeAdmin = require('../auth/authorizeAdmin');
const users = require('express').Router();
const getAll = require('./getAll');
const get = require('./get');
const save = require('./save');
const current = require('./current');
const authorized = require('./authorized');

users.get('/current', current);
users.get('/authorized/:role', authorized);
users.get('/', authorizeAdmin, getAll);
users.get('/:id', authorizeAdmin, get);
users.post('/', authorizeAdmin, save);

module.exports = users;
