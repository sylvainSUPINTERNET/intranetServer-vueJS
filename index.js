'use strict';

//use nvm pour switch de node version
//nvm list
//nvm use <version>

//nvm install <node_version>

//node -v

require('colors'); //permet d'équiper le type String de toutes plein de méthode (qui permet le display de color)

const util = require('util');
const bodyParser = require('body-parser');




//on peut promise des méthode avec util.promisify()
//exemple
//const readFile = util.promisify(fs.readFile) //on peut promissiy tous
// readFile('filename.txt').then(data => {data.toString()}).catch(console.error)

//async / await
//async function appStart() { const fileContent = await readFile('filename.txt) }

//les deux font la m^mee chose et permette de "blocker un traitement en attendant une reponse (une promesse)" sans blocker le processus node (dispo depuis v8)

const express = require('express');

//Creation d'une appliccation expressJS
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//config header
app.use(function (req,res,next) {
    //on intranet (client) else *
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


//config via express (creer des clef)
app.set('ip', 'localhost');
app.set('port', 1337);

app.set('db_name', 'intranet');

const mongoose = require('mongoose');

const CollaborateurCtrl = require('./Collaborateur.controller');


app.get('/collaborateurs', function(req,res){
    CollaborateurCtrl.findAll(req,res);
});

app.get('/collaborateur/:id', function (req,res) {
    CollaborateurCtrl.findOne(req,res);
});

app.post('/collaborateur', function (req,res) {
    CollaborateurCtrl.create(req,res);
});

app.put('/collaborateur/:id', function(req,res){
    CollaborateurCtrl.update(req,res);
});

app.delete('/collaborateur/:id', function(req,res){
    CollaborateurCtrl.remove(req,res);
});

// ou
/*
 app.get('/collaborateurs', CollbaorateurCtrl.findAll)
 */







// demare la db au dermarage du server
//indique a mongoose qu'on utilise les promesses à utiliser sont celle par défaut dans Node.js(objet global)
mongoose.Promise = global.Promise //permet les operations chainée (.exec puis .then);

// Transformation de la méthode app.listen() d'Express en "Promesse JS"
const appListen = (app, port, ip) => {
    return new Promise((resolve, reject) => {
        app.listen(port, ip, resolve)
    })
};

// Connexion à la base de données MONGO,

//attention promissify ici et codé par nous même, car les function qui se promisiffy fonctionne SEULEMENT si elle sont de type retyour err,data et non de retour callback
//donc uniquement les method convionné node (err,data) en retour se promissify sinon on le fait à la main
//ainsi listen venat de express ne peut pas etre promissify car il return une err ou une callback

mongoose
    .connect('mongodb://localhost:27017/intranet', {useMongoClient:true})
    .then( () => console.log('MongoDB : Connexion établie'.bgGreen) )
    .then( appListen(app, app.get('port'), app.get('ip')) )
    .then( () => console.log(` App Started on http://${app.get('ip')}:${app.get('port')} `.bgGreen) )
    .catch(err => console.log(err.message.red))