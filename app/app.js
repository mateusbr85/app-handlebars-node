const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('../src/database/db');
const path = require('path');
const handlebars = require('express-handlebars');
var pluralize = require('pluralize')
// const hbs = require('../src/plugins/handlebars')

app.use(express.json());

const scripts = path.join(__dirname, '../functions');
app.use(express.static(scripts));

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath))

const hbs = handlebars.create({
    defaultLayout: 'main',
    helpers: {
        console: function(value) {
            console.log({value});
        }
    }
})

// template engine 
    app.engine('handlebars', hbs.engine)
    app.set('view engine', 'handlebars')
// body parser engine
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


const isModelCrud = async (crud) => {
    return await require("../src/database/models/" + crud)
};


// Rotas
app.get('/cadastro', (req, res) => {
    res.render('formulario');
})

app.post('/:crud/add', async (req, res) => {
    let model = await isModelCrud(req.params.crud);
    const data = req.body;
    let routeRedirect = 'listagem'

    model.create({
        ...data
    }).then(() => {
        res.redirect(`/${routeRedirect}/${req.params.crud}/list`)
    }).catch((e)=> {
        res.send('houve um erro: ',e)
    })
    // console.log(isModelCrud)
    // console.log(req)
})

app.get('/:crud/:table/list', async (req, res) => {
    let model = await isModelCrud(req.params.table);
    await model.findAll().then((data) => {
        for(let i in data){
            data[i].dataValues.table = req.params.table;
        }
        console.log(data[0].dataValues)

        res.render(req.params.crud, {data: data, title:req.params.table, script: req.params.table})
    }).catch((e) => {console.log(e)});
})

app.get('/:crud/:id/delete', async(req,res) =>{
    // const deleteLine = async(table,value) => {

    // }

    let model = await isModelCrud(req.params.crud);
    // console.log(model)
    // let singularModel = pluralize.singular(req.params.crud);
    // singularModel = `${singularModel}_id`
    // singularModel = singularModel.toLowerCase();
    await model.destroy({where: {id : req.params.id}}).then(() => {
        res.redirect(`/listagem/${req.params.crud}/list`)
    }).catch((e) => {console.error(e)});
})

// este codigo abaixo sempre deve ser o ultimo em nosso arquivo, pois sera responsavel por toda aplicação.
app.listen(8000, function(){
    console.log("Servidor Rodando :::");
});