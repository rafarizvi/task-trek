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

router.get('/tasks/:id', withAuth, async (req, res) => {
  try {
      const task = await Task.findByPk(req.params.id, {
          include: [{ model: User, attributes: ['username'] }]
      });

      if (!task) {
          res.status(404).render('error', { error: "Task not found" });
          return;
      }

      const taskPlain = task.get({ plain: true });

      res.render('task', {
          task: taskPlain,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      console.error(err);
      res.status(500).render('error', { error: err });
  }
});



// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Task }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('homepage', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



router.get('/login',(req, res) => {
 
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