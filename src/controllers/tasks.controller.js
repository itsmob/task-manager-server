import Task from '../models/task.model.js';

export async function createTask(req, res) {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(404).json(['Task wasnt created']);
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate('user');
    res.json(tasks);
  } catch (error) {
    return res.status(404).json(['Tasks not found']);
  }
}

export async function getTask(req, res) {
  try {
    const taskFound = await Task.findById(req.params.id);
    if (!taskFound) return res.status(404).json({ message: 'Task not found' });
    res.json(taskFound);
  } catch (error) {
    return res.status(404).json(['Task not found']);
  }
}

export async function updateTask(req, res) {
  try {
    const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!taskUpdated) return res.status(404).json({ message: 'Task not found' });
    res.json(taskUpdated);
  } catch (error) {
    return res.status(404).json(['Task wasnt updated']);
  }
}

export async function deleteTasks(req, res) {
  try {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id);
    if (!taskDeleted) return res.status(404).json({ message: 'Task not found' });
    res.sendStatus(204);
  } catch (error) {
    return res.status(404).json(['Task wasnt deleted']);
  }
}
