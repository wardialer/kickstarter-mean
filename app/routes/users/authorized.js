module.exports = (req, res) => {
    const role = req.params.role;
    if (!req.session.user) {
        return res.status(500).json({ message: 'User not in session' });
    }
    if (req.session.user.role !== role) {
        return res.status(403).json({ message: 'Role unauthorized' });
    }
    return res.json({ message: 'ok' });
};
