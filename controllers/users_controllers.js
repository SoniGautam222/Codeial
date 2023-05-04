const User =require('../models/user');

module.exports.profile = function(req,res){
    // res.end('<h1>User Profile</h1');
    return res.render('user_profile',{
        title: "profile",
    })
}

// render the sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }


    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title : "Codeial | Sign In"
    })

}

// get the sign up data

module.exports.create = async function (req, res) {
    if (req.body.password != req.body.comfirm_password) {
        // console.log(' passport are not correct !!');
      return res.redirect("back");
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        // console.log('increate !!');
      await User.create(req.body);
      return res.redirect("/users/sign-in");
    }
    console.log('user already created');
    return res.redirect("back");
  };

// sign in and create a session for the user
module.exports.createSession=function (req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if (err) {
            console.log(err);
          }
    });
    return res.redirect('/');
}