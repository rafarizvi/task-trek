const router = require('express').Router();
const userRoutes = require('./userRoutes');
const allTask = require('./taskRoutes')

router.use('/tasks' , allTask);
router.use('/users', userRoutes);

module.exports = router;

