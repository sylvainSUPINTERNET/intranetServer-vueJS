/**
 * Created by SYLVAIN on 31/10/2017.
 */

const Collaborateurs = require('./Collaborateur.model')


module.exports = {
   /*
    GET /collaborateurs
    Renvoie la liste de tous les collaborateurs en base
    */
  findAll : function(req,res){
      Collaborateurs.find({})
          .exec()
          .then(function(collaborateur){
              if(collaborateur === null){
                  return res.status(500).json({error:1, message:'Aucun collaborateur trouvé'})
              }
              res.json(collaborateur);
          })
          .catch(
              function(err){
                  res.status(500).json({error:1, message:err.message})
              });
  },
    /*
     GET /collaborateur/;id
     Recherche un collaborateur par son id
     */
    findOne: function(req,res){
      let id = req.params.id;
        Collaborateurs.findById({_id: id})
            .exec()
            .then(function(collaborateur){
                if(collaborateur === null){
                    return res.status(500).json({error:1, message:`Collaborateur _id ${id} non trouvé`})
                }

                res.json(collaborateur);
            })
            .catch(
            function(err){
                res.status(500).json({error:1, message:err.message})
            });
    },

};