
const users = require('./user'); 
const task = require('./task');
const profile = require('./profile');

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





module .exports = { users, Profile, tasks };
