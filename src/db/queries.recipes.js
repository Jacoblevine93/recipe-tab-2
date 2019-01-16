const Recipe = require('./models').Recipe;
const Authorizer = require("../policies/recipe");

module.exports = {

	getAllRecipes(callback) {
		return Recipe.all()

		.then((recipes) => {
			callback(null, recipes);
		})
		.catch((err) => {
			callback(err);
		})
	},

   getRecipe(id, callback){
     return Recipe.findById(id)
     .then((recipe) => {
       callback(null, recipe);
     })
     .catch((err) => {
       callback(err);
     })
   },

   addRecipe(newRecipe, callback){
      return Recipe.create({
        title: newRecipe.title,
        description: newRecipe.description
      })
      .then((recipe) => {
        callback(null, recipe);
      })
      .catch((err) => {
        callback(err);
      })
    },

   deleteRecipe(req, callback){

// #1
     return Recipe.findById(req.params.id)
     .then((recipe) => {

 // #2
       const authorized = new Authorizer(req.user, recipe).destroy();

       if(authorized) {
 // #3
         recipe.destroy()
         .then((res) => {
           callback(null, recipe);
         });
         
       } else {

 // #4
         req.flash("notice", "You are not authorized to do that.")
         callback(401);
       }
     })
     .catch((err) => {
       callback(err);
     });
   },

   updateRecipe(req, updatedRecipe, callback){

// #1
     return Recipe.findById(req.params.id)
     .then((recipe) => {

// #2
       if(!recipe){
         return callback("Recipe not found");
       }

// #3
       const authorized = new Authorizer(req.user, recipe).update();

       if(authorized) {

// #4
         recipe.update(updatedRecipe, {
           fields: Object.keys(updatedRecipe)
         })
         .then(() => {
           callback(null, recipe);
         })
         .catch((err) => {
           callback(err);
         });
       } else {

// #5
         req.flash("notice", "You are not authorized to do that.");
         callback("Forbidden");
       }
     });
   }

}