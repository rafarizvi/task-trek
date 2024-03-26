const { Model, DataType}  = require('sequelize');
const sequelize = require('../config/connection');

class tasks extends Model {} 

  tasks.init(
{
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataType.STRING
  },
  description: {
    type: DataType.STRING
  },
  status: {
    type: DataType.STRING,
    defaultValue: 'pending'
  },
  user_id: {
    type: DataType.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
},
{
sequelize,
timestamps: false,
freezeTablename: true,
underscored: true,
modelName: 'task',
}
);

module.exports = tasks;
