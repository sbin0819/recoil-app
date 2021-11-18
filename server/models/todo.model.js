module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define('todo', {
    text: {
      type: Sequelize.STRING,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defalutValue: sequelize.literal('now()'),
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return Todo;
};
