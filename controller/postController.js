const Posts = require('../models/post')

// post create controller
exports.createPost = async (req, res) => {
    let newPost = new Posts(req.body)
    newPost.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: 'post saved successfully'
        });
    });
}

// post find controller
exports.findPost = async (req, res) => {
    Posts.find((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    });
};

// post update controller
exports.updatePost = async (req, res) => {
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: 'post updated successfully',
                updated: posts
            });
        }
    );
}

// post delete controller
exports.deletePost = async (req, res) => {
    Posts.findByIdAndRemove(
        req.params.id,
        (err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: 'post deleted successfully',
            });
        }
    );
}