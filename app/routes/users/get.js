const mongoose = require('mongoose');
const libs = require('../../libs/users');

module.exports = (req, res) => {
    const id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(id)) {
        libs.get(id)
            .then(data => res.json(data))
            .catch(error => res.status(500).json(error));
    } else {
        res.status(400).json('missing parameter');
    }
};
