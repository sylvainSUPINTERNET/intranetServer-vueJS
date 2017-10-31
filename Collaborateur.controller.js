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
    /*
     POST /collaborateur
     Ajoute un collaborateur
     */
    create: function(req,res){
        Collaborateurs
            .create(req.body)
            .then(function(collaborateur){
                res.json({success:1, message: 'Collaborateur créé', inserted: collaborateur})
            })
            .catch(function(err){
                res.status(500).json({error:1, message:err.message})
            })
    },
    /*
     PUT /collaborateur/:id
     Edit une collaborateur possendant l'id :id
     */
    update: function(req,res){
        let id = req.params.id;
        let data = req.body;
       Collaborateurs
           .findByIdAndUpdate(id, data, {new:true}) //par defaut id,data renvoit l'utilisateur avant l'update le 3 param true renvoit l'user apres modif
           .exec()
           .then(function(updatedUser){
               res.json({success:1, message: 'Collaborateur updated', updated: updatedUser})

           })
           .catch(function(err){
               res.status(500).json({error:1, message:err.message})
           })
    },
    /*
     DELETE /collaborateur/:id
     Delete un collaborateur
     */
    remove: function(req,res){
        let id = req.params.id;
        Collaborateurs
            .findByIdAndRemove(id)
            .exec()
            .then(function(deletedCollaborateur){
                res.json({success:1, message:'Collaborateur supprimée', deleted: deletedCollaborateur})
            })
            .catch(function(err){
                res.status(500).json({error:1, message:err.message})
            })
    },

};