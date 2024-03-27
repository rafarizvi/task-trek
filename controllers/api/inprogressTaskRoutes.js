const router = require('express').Router();

// Post route for adding a new in progress tasks
router.post('/', async (req, res) => {
    try {
      const newInprogressTask = await InprogressTask.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newInprogressTask);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // Get route for displaying in progress tasks.
  router.get('/:id', async (req, res) => {
    try {
      const inprogressTask = await InprogressTask.findOne({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!inprogressTask) {
        res.status(404).json({ message: 'No in progress tasks found with this id!' });
        return;
      }
  
      res.status(200).json(inprogressTask);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Delete route for removing in progress tasks.
  router.delete('/:id', async (req, res) => {
    try {
      const inprogressTaskData = await InprogressTask.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!inprogressTaskData) {
        res.status(404).json({ message: 'No in progress tasks found with this id!' });
        return;
      }
  
      res.status(200).json(inprogressTaskData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;