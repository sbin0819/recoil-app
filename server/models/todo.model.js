module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define('todo', {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
