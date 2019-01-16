const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;
const Recipe = require("../../src/db/models").Recipe;

   beforeEach((done) => {
     this.recipe;
     this.user;

     sequelize.sync({force: true}).then((res) => {

// #2
       User.create({
         email: "starman@tesla.com",
         password: "Trekkie4lyfe"
       })
       .then((user) => {
         this.user = user; //store the user

// #3
         Recipe.create({
           title: "Expeditions to Alpha Centauri",
           description: "A compilation of reports from recent visits to the star system.",
         })
         .then((recipe) => {
           this.recipe = recipe; //store the topic
           done();
         })
       })
     });
   });