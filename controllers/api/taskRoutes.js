const router = require("express").Router();
const { Task } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const tasksData = await Task.findAll({
            where: { user_id: req.session.user_id },

        });


        const tasks = tasksData.map((task) => task.get({ plain: true }));

        res.render('homepage', { tasks });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/", withAuth, async (req, res) => {
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
