const router = require('express').Router(); 
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes')

router.use('/user', userRoutes);
router.use('/tasks', taskRoutes)
module.exports = router;