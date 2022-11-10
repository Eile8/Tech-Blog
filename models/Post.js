const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Post extends Model {}

Post.init({
    title: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false
    },
    content: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false
    },
    createdAt: {
        type: DataTypes.DATE,                 
      get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
        }
    }
},{
    sequelize
});

module.exports=Post