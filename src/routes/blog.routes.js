import express from 'express';
import { createBlog, getBlogBySlug } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/create', createBlog);
router.get('/:slug', getBlogBySlug);

export default router;
