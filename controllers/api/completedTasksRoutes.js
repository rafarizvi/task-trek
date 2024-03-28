const router = require('express').Router();
const { CompletedTask } = require("../../models");
const withAuth = require("../../utils/auth");

// Post route for adding a new completed tasks
router.post('/',withAuth,withAuth, async (req, res) => {
    try {
      const newCompletedTask = await CompletedTask.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newCompletedTask);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// // Get route for displaying completed tasks.
// router.get('/:id', async (req, res) => {
//     try {
//       const completedTask = await CompletedTask.findOne({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!completedTask) {
//         res.status(404).json({ message: 'No completed tasks found with this id!' });
//         return;
//       }
  
//       res.status(200).json(completedTask);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// Get route for displaying all completed tasks.
  router.get('/', withAuth, async (req, res) => {
    try {
      const completedTask = await CompletedTask.findAll({
        where: { user_id: req.session.user_id },
    });
      return res.status(200).json(completedTask);
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Delete route for removing completed tasks.
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const completedTaskData = await CompletedTask.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!completedTaskData) {
        res.status(404).json({ message: 'No completed tasks found with this id!' });
        return;
      }
  
      res.status(200).json(completedTaskData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
