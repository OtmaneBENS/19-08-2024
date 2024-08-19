const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


router.route('/posts/:post_id/comments')
    .get(commentController.listAllComments)  
    .post(commentController.createAComment); 


router.route('/comments/:comment_id')
    .get(commentController.getAComment)     
    .put(commentController.updateAComment)   
    .delete(commentController.deleteAComment); 

module.exports = router;
