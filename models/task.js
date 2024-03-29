const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model { }

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending',
            validate: {
                isIn: [['pending', 'completed', 'inProgress']]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task',
    }
);

module.exports = Task;
