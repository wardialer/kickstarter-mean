const User = require('../../models/user');

module.exports = id => new Promise((resolve, reject) => {
    User.find({ _id: id }, (err, users) => {
        if (err) {
            reject(err);
        } else {
            resolve(users);
        }
    });
});
