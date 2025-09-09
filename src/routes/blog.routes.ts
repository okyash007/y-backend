import express, { Router } from 'express';
import { createBlog, getBlogBySlug } from '../controllers/blog.controller.js';

const router: Router = express.Router();

router.post('/create', createBlog);
router.get('/:slug', getBlogBySlug);

export default router;
