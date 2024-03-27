const router = require('express').Router();

// Post route for adding a new tasks. New tasks are added to pending tasks.
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

  module.exports = router;