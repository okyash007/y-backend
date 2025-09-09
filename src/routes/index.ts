import express, { Router } from 'express';
import userRoutes from './user.routes.js';
import blogRoutes from './blog.routes.js';
import deviceRoutes from './device.routes.js';

const router: Router = express.Router();

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);
router.use('/device', deviceRoutes);

export default router;
