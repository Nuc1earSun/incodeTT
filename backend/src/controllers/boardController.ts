import * as boardServices from '../services/boardServices.ts';
import {  Request, Response } from 'express';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tasks = await boardServices.getTasks(id);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = req.body;
    const tasks = await boardServices.updateTask(task, id);
    res.json({ message: 'Task updated successfully', tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await boardServices.deleteBoard(id);
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id, taskId } = req.params;
    await boardServices.deleteTask(taskId, id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export const createTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const task = req.body;
    const tasks = await boardServices.createTask(task, id);
    res.json({ message: 'Task created successfully', tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};