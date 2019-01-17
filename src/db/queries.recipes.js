const Recipe = require('./models').Recipe;

module.exports = {

	getAllRecipes(callback) {
		return Recipe.all()

		.then((recipes) => {
			callback(null, recipes);
		})
		.catch((err) => {
      console.log(err);
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
        description: newRecipe.description,
        userId: newRecipe.userId
      })
      .then((recipe) => {
        callback(null, recipe);
      })
      .catch((err) => {
        console.log(err);
        callback(err);
      })
    },

   deleteRecipe(req, callback){

// #1
     return Recipe.findById(req.params.id)
     .then((recipe) => {
 // #3
         recipe.destroy()
         .then((res) => {
           callback(null, recipe);
         });
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

         recipe.update(updatedRecipe, {
           fields: Object.keys(updatedRecipe)
         })
         .then(() => {
           callback(null, recipe);
         })
         .catch((err) => {
           callback(err);
         });
     });
   }

}