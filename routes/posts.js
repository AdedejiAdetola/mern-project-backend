import express from 'express';
import { createPosts, getPosts, updatePosts, deletePosts, likePosts } from '../controllers/posts.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', authMiddleware, createPosts);
router.patch('/:id', authMiddleware, updatePosts);
router.delete('/:id', authMiddleware, deletePosts)
router.patch('/:id/likePosts', authMiddleware, likePosts)


export default router;