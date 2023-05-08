const Post = require('../models/post');
const User=require('../models/user')

module.exports.home= function(req,res){
  // console.log(req.cookies);
  // res.cookie('user_id',25)
  Post.find({})
  .populate('user')
  .populate({
    path: 'comments',
    populate : {
      path : 'user'
    }
  })
    .then(posts => {
      return User.find({}).exec()
    .then(users =>{
        res.render('home', {
          title: 'Codeial: Home',
          posts: posts,
          all_user: users
        });
      })
    })
     
 
    .catch(err => {
      console.log(err);
      return res.redirect('back');
    });
  }
  