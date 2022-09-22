const express = require('express');
const router = express.Router();

const controller = require('../controller/postController')

// post Routes
router.post('/post', controller.createPost);
router.get('/post',controller.findPost);
router.put('/post/update/:id', controller.updatePost);
router.delete('/post/delete/:id', controller.deletePost);

module.exports = router;
