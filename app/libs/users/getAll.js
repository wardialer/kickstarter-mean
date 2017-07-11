const User = require('../../models/user');

module.exports = () => new Promise((resolve, reject) => {
    User.find({}, (err, users) => {
        if (err) {
            reject(err);
        } else {
            resolve(users);
        }
    });
});
