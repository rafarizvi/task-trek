const router = require('express').Router();
const userRoutes = require('./userRoutes');
const pendingTasks = require('./pendingTaskRoutes');
const inprogressTasks = require('./inprogressTaskRoutes');
const completedTasks = require('./completedTasksRoutes');
const newTask = require('./newTask');
const viewTask = require('./viewTask');
const allTask = require('./taskRoutes')

router.use('/tasks' , allTask)
router.use('/users', userRoutes);
router.use('/pending-tasks', pendingTasks);
router.use('/inprogress', inprogressTasks);
router.use('/completed', completedTasks);
router.use('/new-task', newTask);
router.use('/view-task', viewTask);

module.exports = router;