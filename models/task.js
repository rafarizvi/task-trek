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
            type: DataTypes.STRING
        },

        description: {
            type: DataTypes.STRING
        },

        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },

        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        priority: {
            type: DataTypes.STRING,
            defaultValue: 'high',
            validate: {
                isIn: [['high', 'medium', 'low']]
            }
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

module.exports = Task;
