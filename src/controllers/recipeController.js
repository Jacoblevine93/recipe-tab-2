const recipeQueries = require('../db/queries.recipes.js');

module.exports = {
  index(req, res, next){
    
  	recipeQueries.getAllRecipes((err, recipes) => {

  		if(err){
  			res.redirect(500, 'static/index');
  		} else {
  			res.render('recipes/index', {recipes});
  		}
  	})

  },

  new(req, res, next){
  	res.render('recipes/new');
  },

   create(req, res, next){

       let newRecipe = {
         title: req.body.title,
         description: req.body.description,
         userId: req.user.id
       };
       recipeQueries.addRecipe(newRecipe, (err, recipe) => {
         if(err){
           res.redirect(500, "recipes/new");
         } else {
           res.redirect(303, `/recipes/${recipe.id}`);
         }
       });
   },

   show(req, res, next){

//#1
     recipeQueries.getRecipe(req.params.id, (err, recipe) => {

//#2
       if(err || recipe == null){
         res.redirect(404, "/");
       } else {
         res.render("recipes/show", {recipe});
       }
     });
   },

   destroy(req, res, next){

 // #1
     recipeQueries.deleteRecipe(req, (err, recipe) => {
       if(err){
         res.redirect(err, `/recipes/${req.params.id}`)
       } else {
         res.redirect(303, "/recipes")
       }
     });
   },

  edit(req, res, next){

 // #1
     recipeQueries.getRecipe(req.params.id, (err, recipe) => {
       if(err || recipe == null){
         res.redirect(404, "/");
       } else {
         res.render("recipes/edit", {recipe});

       }
     });
   },   

   update(req, res, next){

 // #1
     recipeQueries.updateRecipe(req, req.body, (err, recipe) => {
       if(err || recipe == null){
         res.redirect(401, `/recipes/${req.params.id}/edit`);
       } else {
         res.redirect(`/recipes/${req.params.id}`);
       }
     });
   }

}