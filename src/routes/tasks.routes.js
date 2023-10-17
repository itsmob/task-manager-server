import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createTask, deleteTasks, getTask, getTasks, updateTask } from '../controllers/tasks.controller.js';

const router = Router();

router.post('/tasks', authRequired, createTask);

router.get('/tasks', authRequired, getTasks);

router.get('/task/:id', authRequired, getTask);

router.put('/task/:id', authRequired, updateTask);

router.delete('/task/:id', authRequired, deleteTasks);

export default router;
