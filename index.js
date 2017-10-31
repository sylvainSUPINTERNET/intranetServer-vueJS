'use strict';

//use nvm pour switch de node version
//nvm list
//nvm use <version>

//nvm install <node_version>

//node -v

require('colors'); //permet d'équiper le type String de toutes plein de méthode (qui permet le display de color)

const util = require('util');

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

const mongoose = require('mongoose');




app.get('/', function(req,res){
    res.send('Hello world')
});



//config via express (creer des clef)
app.set('ip', 'localhost');
app.set('port', 1337);

app.set('db_name', 'intranet');

// demare la db au dermarage du server
//indique a mongoose qu'on utilise les promesses à utiliser sont celle par défaut dans Node.js(objet global)
mongoose.Promise = global.Promise

// Transformation de la méthode app.listen() d'Express en "Promesse JS"
const appListen = (app, port, ip) => {
    return new Promise((resolve, reject) => {
        app.listen(port, ip, resolve)
    })
}

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