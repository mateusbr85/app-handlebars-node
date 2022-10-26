const Usuarios = sequelize.define('users', {
    user_name: {
        type: Sequelize.STRING
    },
    user_last_name: {
        type: Sequelize.STRING
    },
    user_age: {
        type: Sequelize.INTEGER
    },
    user_mail: {
        type: Sequelize.STRING
    }

})

module.exports = Usuarios;