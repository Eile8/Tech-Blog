const express = require('express');
const router = express.Router();

const userRoutes = require("./user");
router.use("/api/users",userRoutes)
const frontEndRoutes = require("./frontEnd");
router.use("/",frontEndRoutes)

router.get("/session",(req,res)=>{
    res.json(req.session)
})

module.exports = router