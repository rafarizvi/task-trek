const sequelize = require('../config/connection');
const { User, Task, PendingTask, InprogressTask, CompletedTask } = require('../models');

const userData = require('./userData.json');
const taskData = require('./taskData.json');
const pendingTaskData = require('./pendingTaskData.json');
const inprogressTaskData = require('./inprogressTaskData.json');
const completedTaskData = require('./completedTaskData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const task of taskData) {
        await Task.create({
            ...task,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const pendingTask of pendingTaskData) {
        await PendingTask.create({
            ...pendingTask,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const inprogressTask of inprogressTaskData) {
        await InprogressTask.create({
            ...inprogressTask,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const completedTask of completedTaskData) {
        await CompletedTask.create({
            ...completedTask,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();