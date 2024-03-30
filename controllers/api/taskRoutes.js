const router = require("express").Router();
const { Task } = require("../../models");
const withAuth = require("../../utils/auth");

router.get('/tasks', async (req, res) => {
    try {
      const taskData = await Task.findAll({
        include: [{ model: User, attributes: ['username'] }],
      });
  
      const tasks = taskData.map((task) => task.get({ plain: true }));
  
      res.render('task', { tasks, logged_in: req.session.logged_in });
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
  
      res.render('homepage', { ...user, logged_in: true });
    } catch (err) {
      res.status(500).json(err);
    }
  });



router.post('/', withAuth, async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatedTask = await Task.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (updatedTask[0] === 0) {
            res.status(404).json({ message: "No task found with this id!" });
            return;
        }
        res.status(200).json({ message: "Task updated successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const taskData = await Task.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!taskData) {
            res.status(404).json({ message: "No project found with this id!" });
            return;
        }

        res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
