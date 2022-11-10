const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
//const flavorSeeds = require("./flavors.json")

const seeds = async()=>{
    try {
        await sequelize.sync({force:true});
        const users = await User.bulkCreate([
            {
                username:"eileen23",
                password:"QuickPost",
            },
            {
                username:"bluecat",
                password:"meowmeow",
            },
            {
                username:"journalist",
                password:"pr8fessionaL",
            }
        ],{
            individualHooks:true
        })
        const flavors = await Post.bulkCreate([
            {
                title:"Healthy Nutrients in Avocado",
                content:"Avocados contains many healthy nutrients including fats that makes you feel fuller in between meals as well as vitamin C, E, K, and B6.",
                UserId: 1
            },
            {
                title:"Benefits of Drinking Milk",
                content:"Milk is an excellent source to get proteins, calcium, phospherus and vitamin D. It can prevent osteoporosis and help main a healthy weight.",
                UserId: 2
            },
            {
                title:"Include Green Leafy Vegetables in Your Diet",
                content:"Green leafy vegetables are good for you. They contain high level of fibers and various healthy nutrients to keep your body healthy. One important vitamin found in dark greens is vitamin B9, folate, which promotes heart health and prevents birth defect.",
                UserId: 3
            },
        ])
          // console.log(users[0].toJSON());
        // console.log(flavors[1].toJSON());
       await  users[0].addLove(1)
       await  users[2].addLove([1,2])
       await flavors[1].addLovedBy([1,2,3]);
       await flavors[2].addHatedBy([1,2,3]);
       await users[1].addHate(1);
       const joined = await User.findAll({
        include:["Love","Hate"]
       })
       joined.forEach(usr=>console.log(usr.toJSON()))
        process.exit(0);
    }catch(err){
        console.log(err)
        process.exit(1);
    } 
}

seeds();