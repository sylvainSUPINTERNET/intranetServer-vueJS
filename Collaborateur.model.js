/**
 * Created by SYLVAIN on 31/10/2017.
 */

const mongoose = require('mongoose');

const collaborateurSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
        enum: ["female", "male"]
    },
    lastname: {
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    birthdate:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    photo:{
        type: String
    }
}, {collection: 'collaborateurs'});

const collaborateurModel = mongoose.model('Collaborateur', collaborateurSchema);

module.exports = collaborateurModel;