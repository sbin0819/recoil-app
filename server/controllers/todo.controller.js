import db from '../models';
const Todo = db.todos;
const Op = db.Sequelize.Op;

const TodoController = {
  findAll: (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Todo.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving todos.',
        });
      });
  },
  findOne: (req, res) => {
    const id = req.params.id;

    Todo.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        }
        res.send({ message: 'There are no id=' + id });
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Todo with id=' + id,
        });
      });
  },
  create: (req, res) => {
    if (!req.body.text) {
      res.status(400).send({
        message: 'Text can not be empty!',
      });
      return;
    }

    const todo = {
      text: req.body.text,
    };

    Todo.create(todo)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the Todo.',
        });
      });
  },
  update: (req, res) => {
    const id = req.params.id;

    Todo.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: 'Todo was updated successfully.',
          });
        } else {
          res.send({
            message: `Cannot update Todo with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error updating Todo with id=' + id,
        });
      });
  },
  deleteOne: (req, res) => {
    const id = req.params.id;

    Todo.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: 'Todo was deleted successfully!',
          });
        } else {
          res.send({
            message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Could not delete Todo with id=' + id,
        });
      });
  },
};

export default TodoController;
