'use strict';

require('colors'); //permet d'équiper le type String de toutes plein de méthode (qui permet le display de color)

const express = require('express');

//Creation d'une appliccation expressJS
const app = express();

const mongoose = require('mongoose');




app.get('/', function(req,res){
    req.send('')
});


app.listen(1337, () => console.log(' Server started ...' .rainbow)
);