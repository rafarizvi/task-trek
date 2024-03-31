const router = require('express').Router();
const { Task, User } = require('../models');
const withAuth = require('../utils/auth');



router.get('/', async (req, res) => {
  try {
    
    const taskData = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });


    const tasks = taskData.map((task) => task.get({ plain: true }));

    res.render('homepage', { 
      tasks, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const task = taskData.get({ plain: true });

    res.render('homepage', {
      ...task,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Task }],
    });

    const user = userData.get({ plain: true });

    res.render('homepage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
 
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/register', (req, res) => {
  
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

module.exports = router;