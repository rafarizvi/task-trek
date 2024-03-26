const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model {}

Profile.init(
{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  bio: {
    type: DataTypes.TEXT
  },
},  {
sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'profile'
});

module.exports = Profile;