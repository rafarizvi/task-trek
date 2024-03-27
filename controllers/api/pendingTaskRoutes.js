const router = require('express').Router();

// Post route for adding a new completed tasks
router.post('/', async (req, res) => {
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

  // Get route for displaying completed tasks.
  router.get('/:id', async (req, res) => {
    try {
      const pendingTask = await PendingTask.findOne({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!pendingTask) {
        res.status(404).json({ message: 'No pending tasks found with this id!' });
        return;
      }
  
      res.status(200).json(pendingTask);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete route for removing completed tasks.
  router.delete('/:id', async (req, res) => {
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