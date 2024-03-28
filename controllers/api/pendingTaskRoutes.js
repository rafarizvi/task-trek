const router = require('express').Router();
const { PendingTask } = require("../../models");
const withAuth = require("../../utils/auth");

// Post route for adding a new pending tasks
router.post('/', withAuth, async (req, res) => {
  try {
    const newPendingTask = await PendingTask.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPendingTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get route for displaying all pending tasks.
router.get('/', withAuth, async (req, res) => {
  try {
    const pendingTask = await PendingTask.findAll({
      where: { user_id: req.session.user_id },
  });
    return res.status(200).json(pendingTask);

  } catch (err) {
    res.status(500).json(err);
  }
});


// // Get route for displaying specific pending tasks.
// router.get('/:id', async (req, res) => {
//   try {
//     const pendingTask = await PendingTask.findOne({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!pendingTask) {
//       res.status(404).json({ message: 'No pending tasks found with this id!' });
//       return;
//     }

//     res.status(200).json(pendingTask);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Delete route for removing pending tasks.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const pendingTaskData = await PendingTask.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!pendingTaskData) {
      res.status(404).json({ message: 'No pending tasks found with this id!' });
      return;
    }

    res.status(200).json(pendingTaskData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;