const router = require('express').Router();
const { Task, User } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', withAuth, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
    });
    res.render('homepage', { tasks, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/tasks/:id', withAuth, async (req, res) => {
//   try {
//     const task = await Task.findByPk(req.params.id, {
//       include: [{ model: User, attributes: ['username'] }],
//     });
//     res.render('tasks', { ...task.get({ plain: true }), logged_in: req.session.logged_in });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('register');
  }
});
module.exports = router;