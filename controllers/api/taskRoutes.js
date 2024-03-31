const router = require("express").Router();
const { Task, User } = require("../../models");

const withAuth = require("../../utils/auth");
const { appendTaskToFile } = require("../../utils/helpers");

// router.get('/', withAuth, async (req, res) => {
//     try {
//         const tasks = await Task.findAll({
//             where: { user_id: req.session.user_id },
//             include: [{ model: User, attributes: ['username'] }]
//         });

//         const tasksPlain = tasks.map(task => task.get({ plain: true }));

//         res.render('homepage', {
//             tasks: tasksPlain,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).render('error', { error: err });
//     }
// });

router.get('/:id', withAuth, async (req, res) => {
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
        res.status(500).render('error', { error: err }); // 
    }
  });


router.post('/', withAuth, async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            user_id: req.session.user_id, 
        });

        const newTaskData = newTask.get({ plain: true });
        await appendTaskToFile(newTaskData).catch(err => console.error("Failed to append task to file:", err));

        res.status(201).redirect('/api/tasks'); 
    } catch (err) {
        console.error(err);
        res.status(400).render('error', { error: err }); // 
    }
});

// UPDATE a task
router.put('/:id', withAuth, async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'No task found with this id!' });
            return;
        }

        if (task.user_id !== req.session.user_id) {
            res.status(403).json({ message: 'You do not have permission to update this task' });
            return;
        }

        await task.update(req.body);
        const updatedTask = await task.get({ plain: true });
        res.status(200).json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: err }); // 
    }
});

// DELETE a task
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const taskData = await Task.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!taskData) {
            res.status(404).json({ message: "No task found with this id!" });
            return;
        }

        res.status(200).json(taskData);
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: err }); 
    }
});

module.exports = router;
