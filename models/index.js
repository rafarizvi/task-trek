
const User = require('./user'); 
const Profile = require('./profile');
const Task = require('./task');
const PendingTask = require('./PendingTask');
const InprogressTask = require('./InprogressTask');
const CompletedTask = require('./CompletedTask');


User.hasOne(Profile, {
  foreignKey: 'userId', // Asegúrate de definir esta clave foránea en tu modelo Profile
  onDelete: 'CASCADE'
});

// Un perfil pertenece a un usuario
Profile.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Task, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Task.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(PendingTask, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

PendingTask.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(InprogressTask, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

InprogressTask.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(CompletedTask, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

CompletedTask.belongsTo(User, {
  foreignKey: 'userId',
});


module .exports = { User, Profile, Task, PendingTask, InprogressTask, CompletedTask };
