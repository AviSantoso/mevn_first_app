const db = require('../models');

const Todo = db.todo;
const UNKNOWN_ERROR = 'unknown error occurred';

exports.create = async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).send({ message: 'Todo title is required.' });
      return;
    }

    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed ? req.body.completed : false,
    });

    const data = await todo.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || UNKNOWN_ERROR });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { title } = req.query;
    const condition = title
      ? { title: { $regex: new RegExp(title), $options: 'i' } }
      : {};

    const data = await Todo.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || UNKNOWN_ERROR });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: 'Todo id is required.' });
      return;
    }

    const todo = await Todo.findById(id);

    if (todo) {
      res.send(todo);
    } else {
      res.status(400).send({ message: `Todo not found with id ${id}` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || UNKNOWN_ERROR });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ message: 'Data to update cannot be empty.' });
    }
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (todo) {
      res.send(todo);
    } else {
      res.status(400).send({ message: `Cannot update Todo with id = ${id}.` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || UNKNOWN_ERROR });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: 'Todo id is required.' });
      return;
    }

    const data = await Todo.findByIdAndRemove(id);

    if (data) {
      res.send(data);
    } else {
      res.status(400).send({ message: `Todo not found with id ${id}` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || UNKNOWN_ERROR });
  }
};
