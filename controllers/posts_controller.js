const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id
    });

    return res.redirect('back');
  } catch (error) {
    console.error(error);
    return res.redirect('back');
  }
}

module.exports.destroy = async function(req, res) {
  try {
    let post = await Post.findByIdAndRemove(req.params.id);

    if (post.user == req.user.id) {
      await Comment.deleteMany({ post: req.params.id });

      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (error) {
    console.error(error);
    return res.redirect('back');
  }
}