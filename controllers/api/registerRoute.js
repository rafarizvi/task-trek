const { User } = require('../../models');

exports.registerUser = async (req, res) => {
    try {
        const checkUserData = await User.findOne({ where: { email: req.body.email } });

        if (!checkUserData) {
            const userData = await User.create(req.body);

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
                res.redirect('/');
            });
        }
        else {
            
            res.status(401).send('An account is already registered using this email');
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = exports;