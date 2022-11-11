const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const seeds = async()=>{
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate([
        {
            username: "eileen23",
            password: "QuickPost",
        },
        {
            username: "bluecat",
            password: "meowmeow",
        },
        {
            username: "journalist",
            password: "pr8fessionaL",
        }
    ], {
        individualHooks: true
    })
    const posts = await Post.bulkCreate([
        {
            title: "Healthy Nutrients in Avocado",
            content: "Avocados contains many healthy nutrients including fats that makes you feel fuller in between meals as well as vitamin C, E, K, and B6.",
            UserId: 1
        },
        {
            title: "Benefits of Drinking Milk",
            content: "Milk is an excellent source to get proteins, calcium, phospherus and vitamin D. It can prevent osteoporosis and help main a healthy weight.",
            UserId: 2
        },
        {
            title: "Include Green Leafy Vegetables in Your Diet",
            content: "Green leafy vegetables are good for you. They contain high level of fibers and various healthy nutrients to keep your body healthy. One important vitamin found in dark greens is vitamin B9, folate, which promotes heart health and prevents birth defect.",
            UserId: 3
        },
    ])
    const comments = await Comment.bulkCreate([
        {
            UserId: 1,
            content: "I drink milk everyday!",
            postID: 2
        },
        {
            UserId: 2,
            content: "vegetables also help with constipation problems",
            postID: 3
        },
        {
            UserId: 3,
            content: "I love avocado.",
            postID: 1
        },

    ])
}

seeds();