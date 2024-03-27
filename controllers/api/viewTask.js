const router = require('express').Router();

// Get route for viewing in progress task.
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

// Post route for saving updated in progress task.
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

module.exports = router;