const db = require('../db');

const Posts = db.sequelize.define('post',{
    post_title: {
        type: db.Sequelize.STRING
    },
    post_content: {
        type: db.Sequelize.TEXT
    }
})

module.exports = Posts;