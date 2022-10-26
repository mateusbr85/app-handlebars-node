const Sequelize = require('sequelize');
const sequelize = new Sequelize('postApp','root','myservemvdev',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
};


