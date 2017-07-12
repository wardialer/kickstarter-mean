const User = require('../../models/user');


/**
 * returns a promise containing requested user
 * @function get
 * @param {string} id
 * @returns {Promise} Resolved with an array containing the requested user.
 */
module.exports = id => new Promise((resolve, reject) => {
    User.find({ _id: id }, (err, users) => {
        if (err) {
            reject(err);
        } else {
            resolve(users);
        }
    });
});
