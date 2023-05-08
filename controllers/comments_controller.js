const Comment = require('../models/comment');
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


module.exports.destroy=  async function(req,res){
 try{ 
  const comment = await Comment.findById(req.params.id);
  if(!comment){
    return res.send('comment not found!!');
  }
    if(comment.user==req.user.id){
      let postId = comment.post;
      await comment.deleteOne();
      await Post.findByIdAndUpdate(postId, { $pull : {comments : req.params.id}});
      return res.redirect('back');
    }else{
      return redirect('back');
    }
  }
  catch(err){
   console.log(err);  }
}