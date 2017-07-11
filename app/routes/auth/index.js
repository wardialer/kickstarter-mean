const auth = require('express').Router();
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');

auth.post('/signup', signup);
auth.post('/login', login);
auth.post('/logout', logout);

module.exports = auth;
