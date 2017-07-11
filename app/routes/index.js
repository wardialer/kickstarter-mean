const routes = require('express').Router();
const users = require('./users');
const auth = require('./auth');

const prefix = '/api';

routes.use(`${prefix}/users`, users);
routes.use(`${prefix}/`, auth);

routes.get(/^(?!\/api).+/, (req, res) => {
    res.sendfile('./public/views/index.html');
});

module.exports = routes;
