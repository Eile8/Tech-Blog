const express = require('express');
const { Post, User, Comment} = require('../models');
const router = express.Router();
const sequalize = require('sequelize');
const sequelize = require('../config/connection');

router.get("/", async(req, res)=> {
    try {
        const posts = await Post.findAll({
            include: [User, Comment],
            order: sequelize.literal('update  at')
        });
        const postsPlain = posts.map(post=>post.get({plain:true}));
        return res.json(postsPlain);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

router.get("/:id", async(req, res)=> {
    try {
        const posts = await Post.findOne({
            where: {id:req.params.id},
            include: [User, Comment],
        });
        const postsPlain = posts.map(post=>post.get({plain:true}));
        return res.json(postsPlain);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

//create new post
router.get("/", async(req, res)=> {
    if (!req.session.activeUser){
        return res.status(401).json({message:"login to create a new post"})
    }
    req.body.UserId = req.session.activeUser.id;
    try{
        const newPost = await Post.create(req.body);
        return res.status(201).json(newPost);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

router.put("/:id", async(req,res)=>{
    if (!req.session.activeUser){
        return res.status(401).json({message:"login to update post"})
    }
    req.body.UserId = req.session.activeUser.id;
    const isMine = await Post.findOne({where:{id:req.params.id, UserId:req.session.activeUser.id}})
    if (!isMine){
        return res.status(401).json({message:"Cannot edit this post"})
    }
    try{
        const updated = await Post.update(req.body, {where:{id:isMine.id}});
        return res.status(201).json(updated);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err.message})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
              id: req.params.id,
            },
        });
        if (!deletePost) {
          res.status(404).json({ message: 'No post with this id!' });
          return;
        }
        res.status(200).json(deletePost);
      } catch (err) {
        res.status(500).json(err);
      }
  });

module.exports = router;