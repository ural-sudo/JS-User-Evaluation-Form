
const Sequelize = require('sequelize');
const sequelize = require('../Util/database');

const Urun = sequelize.define('urunler',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.STRING,
        allowNull:false

    },
    imgUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userOgrenciNo:{
        type:Sequelize.INTEGER,
        allowNull:true
    }
});

module.exports= Urun;