const libs = require('../../libs/users');

module.exports = (req, res) => {
    libs.getAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
};
