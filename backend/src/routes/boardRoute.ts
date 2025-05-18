import express from 'express';

import * as boardController from '../controllers/boardController';

const router = express.Router();

router.get('/boards/:id', boardController.getTasks);
router.put('/boards/:id', boardController.updateTask);
router.delete('/boards/:id', boardController.deleteBoard);
router.delete('/boards/:id/:taskId', boardController.deleteTask);
router.post('/boards/:id/newtask', boardController.createTask);

export default router;
