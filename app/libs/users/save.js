const User = require('../../models/user');


module.exports = (params) => {
    const userData = new User(params);

    return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
            { _id: userData._id },
            userData,
            { upsert: true, new: false },
            (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
    });
};
