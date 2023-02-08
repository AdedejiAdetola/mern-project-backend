import express from 'express';
import { createPosts, getPosts, updatePosts, deletePosts, likePosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPosts);
router.patch('/:id', updatePosts);
router.delete('/:id', deletePosts)
router.patch('/:id/likePosts', likePosts)


export default router;