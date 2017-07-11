const passport = require('passport');

module.exports = (req, res) => {
    passport.authenticate('local-login', (error, user, message) => {
        if (!user) { return res.status(404).json(message); }
        if (error) { return res.status(500).json(error); }

        const userObject = user.toObject();
        delete userObject.password;
        req.session.user = userObject;
        return res.status(200).json('Login successful');
    })(req, res);
};
