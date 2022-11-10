const User = require("./User");
const Post = require("./Post");
const Comment= require("./Comment")

// post and user
User.hasMany(Post,{
    onDelete:"CASCADE", 
    foreignKey: {
        allowNull: false
    }
});

Post.belongsTo(User);

//user and comment
User.hasMany(Comment,{
    onDelete:"CASCADE", 
    foreignKey: {
        allowNull: false
    }
});

Comment.belongsTo(User);

// post and comment
Post.hasMany(Comment, {
    onDelete:"CASCADE",
    foreignKey:{
        allowNull:false
    }
});
Comment.belongsTo(Post);


module.exports= {
    User,
    Post,
    Comment, 
}