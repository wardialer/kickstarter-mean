module.exports = (req, res, next) => {
    if (!req.session.user /* && req.headers.host!='localhost'*/) {
        res.send(401);
    } else {
        next();
    }
};
