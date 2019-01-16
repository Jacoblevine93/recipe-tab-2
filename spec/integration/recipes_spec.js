const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/recipes/';
const sequelize = require('../../src/db/models/index').sequelize;
const Recipe = require('../../src/db/models').Recipe;
const User = require("../../src/db/models").User;

describe('routes : recipes', () => {

	beforeEach((done) => {
		this.recipe;
		sequelize.sync({force: true}).then((res) => {
			Recipe.create({
				title: 'Firework Shrimp',
				description: 'Step 1.. Step 2..'
			})
			.then((recipe) => {
				this.recipe = recipe;
				done();
			})
			.catch((err) => {
				console.log(err);
				done();
			});
		});
	});

describe("admin user performing CRUD actions for Recipe", () => {

	beforeEach((done) => {
       User.create({
         email: "admin@example.com",
         password: "123456",
         role: "admin"
       })
       .then((user) => {
         request.get({         // mock authentication
           url: "http://localhost:3000/auth/fake",
           form: {
             role: user.role,     // mock authenticate as admin user
             userId: user.id,
             email: user.email
           }
         },
           (err, res, body) => {
             done();
           }
         );
       });
     });

	describe('GET /recipes', () => {

		it('should return a status code 200 and all recipes', (done) => {
			request.get(base, (err,res,body) => {
				expect(res.statusCode).toBe(200);
				expect(err).toBeNull();
				expect(body).toContain('Recipes');
				expect(body).toContain('Firework Shrimp')
				done();
			});
		});
	});

	describe('GET /recipes/new', () => {
		it('should render a new recipe form', (done) => {
			request.get(`${base}new`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('New Recipe');
				done();
			});
		});
	});

   describe("POST /recipes/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      };

      it("should create a new recipe and redirect", (done) => {

//#1
        request.post(options,

//#2
          (err, res, body) => {
            Recipe.findOne({where: {title: "blink-182 songs"}})
            .then((recipe) => {
              expect(res.statusCode).toBe(303);
              expect(recipe.title).toBe("blink-182 songs");
              expect(recipe.description).toBe("What's your favorite blink-182 song?");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

   describe("GET /recipes/:id", () => {

     it("should render a view with the selected recipe", (done) => {
       request.get(`${base}${this.recipe.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Firework Shrimp");
         done();
       });
     });

   });

	describe('POST /recipes/:id/destroy', () => {
		it('should delete the recipes with associated ID', (done) => {
			Recipe.all()
			.then((recipes) => {
				const recipeCountBeforeDelete = recipes.length;
				expect(recipeCountBeforeDelete).toBe(1);
				request.post(`${base}${this.recipe.id}/destroy`, (err, res, body) => {
					Recipe.all()
					.then((recipes) => {
						expect(err).toBeNull();
						expect(recipes.length).toBe(recipeCountBeforeDelete - 1);
						done();
					})
				});
			});
		});
	});

   describe("GET /recipes/:id/edit", () => {

     it("should render a view with an edit recipe form", (done) => {
       request.get(`${base}${this.recipe.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Recipe");
         expect(body).toContain("Firework Shrimp");
         done();
       });
     });

   });

	describe('POST /recipes/:id/update', () => {
		it('should update the recipe with given values', (done) => {
			const options = {
				url: `${base}${this.recipe.id}/update`,
				form: {
					title: 'Firework Shrimp',
					description: 'There are a lot of them'
				}
			};

			request.post(options,
				(err, res, body) => {

				expect(err).toBeNull();

				Recipe.findOne({
					where: { id: this.recipe.id }
				})
				.then((recipe) => {
					expect(recipe.title).toBe('Firework Shrimp');
					done();
				});
			});
		});
	});
   })


 // #3: define the member user context
   describe("member user performing CRUD actions for Recipe", () => {

  // #4: Send mock request and authenticate as a member user
	beforeEach((done) => {
       User.create({
         email: "member@example.com",
         password: "123456",
         role: "member"
       })
       .then((user) => {
         request.get({         // mock authentication
           url: "http://localhost:3000/auth/fake",
           form: {
             role: user.role,     // mock authenticate as admin user
             userId: user.id,
             email: user.email
           }
         },
           (err, res, body) => {
             done();
           }
         );
       });
     });

	describe('GET /recipes', () => {

		it('should return a status code 200 and all recipes', (done) => {
			request.get(base, (err,res,body) => {
				expect(res.statusCode).toBe(200);
				expect(err).toBeNull();
				expect(body).toContain('Recipes');
				expect(body).toContain('Firework Shrimp')
				done();
			});
		});
	});

	describe('GET /recipes/new', () => {
		it('should render a new recipe form', (done) => {
			request.get(`${base}new`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain('New Recipe');
				done();
			});
		});
	});

    describe("POST /recipes/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }
      }

      it("should not create a new recipe", (done) => {
        request.post(options,
          (err, res, body) => {
            Recipe.findOne({where: {title: "blink-182 songs"}})
            .then((recipe) => {
              expect(recipe).toBeNull(); // no recipe should be returned
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

   describe("GET /recipes/:id", () => {

     it("should render a view with the selected recipe", (done) => {
       request.get(`${base}${this.recipe.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Firework Shrimp");
         done();
       });
     });

   });

	describe('POST /recipes/:id/destroy', () => {
		it('should delete the recipes with associated ID', (done) => {
			Recipe.all()
			.then((recipes) => {
				const recipeCountBeforeDelete = recipes.length;
				expect(recipeCountBeforeDelete).toBe(1);
				request.post(`${base}${this.recipe.id}/destroy`, (err, res, body) => {
					Recipe.all()
					.then((recipes) => {
						expect(err).toBeNull();
						expect(recipes.length).toBe(recipeCountBeforeDelete);
						done();
					})
				});
			});
		});
	});

   describe("GET /recipes/:id/edit", () => {

     it("should render a view with an edit recipe form", (done) => {
       request.get(`${base}${this.recipe.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Recipe");
         expect(body).toContain("Firework Shrimp");
         done();
       });
     });

   });

	describe('POST /recipes/:id/update', () => {
		it('should update the recipe with given values', (done) => {
			const options = {
				url: `${base}${this.recipe.id}/update`,
				form: {
					title: 'Firework Shrimp',
					description: 'Step 1.. Step 2..'
				}
			};

			request.post(options,
				(err, res, body) => {

				expect(err).toBeNull();

				Recipe.findOne({
					where: { id: this.recipe.id }
				})
				.then((recipe) => {
					expect(recipe.title).toBe('Firework Shrimp');
					done();
				});
			});
		});
	});
   });


});

