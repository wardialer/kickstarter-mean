const libs = require('../../libs/users');

module.exports = (req, res) => {
    libs.save(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
};
