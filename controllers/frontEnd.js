//Install express
const express = require('express');
const router = express.Router();
const {User,Post, Comment} = require('../models');

router.get('/home', async (req,res)=>{

    try{
        const post = await Post.findAll({
            include:[User,Comment],
        });

        const passedInObject = {
            activeUser: req.session.activeUser,
            post: allPost.map(post=>post.get({plain:true}))
        }
    
        res.render('home', passedInObject)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }

})

router.get('/post/:id', async (req,res)=>{

    try{
        const onePost = await Post.findOne({
            where:{id:req.params.id},
            include:[User,{
                model:Comment,
                include:User
            }],
            });
        const passedInObject = {
            activeUser: req.session.activeUser,
            onePost: onePost.get({plain:true})
        }
        console.log(passedInObject);
        return res.render('post', passedInObject)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

router.get('/dashboard', async(req,res)=>{
    if (req.session.activeUser){
        const myPage = await Post.findAll({
            where:{UserId:req.session.activeUser.id},
            include:[User],
            order:sequelize.literal('updatedAt')
        })
        const passedInObject = {
            activeUser: req.session.activeUser,
            post: myPage.map(post=>post.get({plain:true}))
        }
        return res.render('dashboard', passedInObject);
    }else{
        return res.redirect('/signin')
    }
})

router.get('/blog/:id', async(req,res)=>{
    try{
        const user = await User.findByPk(req.params.id);

        if (!user){
            return res.redirect('/home');
        }
        const post = await Post.findAll({
            where:{UserId:req.params.id},
            include:[User],
            order:sequelize.literal('updatedAt')
        });
        const passedInObject = {
            activeUser: req.session.activeUser,
            Post: Post.map(post=>post.get({plain:true})),
            postAuthor: user.get({plain:true})
        }
    
        res.render('blog', passedInObject)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/home')
    });
})

router.get('/addpost',(req,res)=>{
    if (!req.session.activeUser){

    }
    const passedInObject = {
        activeUser: req.session.activeUser
    }
    res.render('add-post', passedInObject)
})

router.get('/')

router.get('*', (req,res)=>{
    res.redirect('/home');
})

module.exports = router;
