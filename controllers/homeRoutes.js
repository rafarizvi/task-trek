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


// router.get('/tasks', async (req, res) => {
//   try {
//     const taskData = await Task.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//       ],
//     });

//     // const task = taskData.get({ plain: true });

//     res.render('tasks', {
//       // ...task,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/tasks', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('tasks');
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/add-task', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('add-task');
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/pending', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('pending');
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/inprogress', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('inprogress');
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/completed', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('completed');
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



// // GET one painting
// router.get('/painting/:id', async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   if (!req.session.loggedIn) {
//     res.redirect('/login');
//   } else {
//     // If the user is logged in, allow them to view the painting
//     try {
//       const dbPaintingData = await Painting.findByPk(req.params.id);

//       const painting = dbPaintingData.get({ plain: true });

//       res.render('painting', { painting, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });




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