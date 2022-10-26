const handlebars = require('express-handlebars');
const path = require('path');

const hbs = handlebars.create({
    defaultLayout: 'main',
    helpers: {
        teste: function() {

        }
    }
})


module.exports = {
    hbs: hbs
}