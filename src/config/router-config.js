module.exports = {
	init(app){
		const staticRoutes = require('../routes/static');
		const recipeRoutes = require('../routes/recipes');
		const userRoutes = require('../routes/users');
  		if(process.env.NODE_ENV === "test") {
     		const mockAuth = require("../../spec/support/mock-auth.js");
     		mockAuth.fakeIt(app);
   		}		
		app.use(staticRoutes);
		app.use(recipeRoutes);
		app.use(userRoutes);
	}
}