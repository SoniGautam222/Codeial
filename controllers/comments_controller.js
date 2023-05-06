const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user._id
    });

    post.comments.push(comment);
    await post.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};