module.exports = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next({ message: 'internal error', status: 500 });
        }

        req.logout();
        return res.json('ok');
    });
};
