
const User = require('./user')
const Task = require('./task');
const Profile = require('./profile');

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





module.exports = { User, Profile, Task };
