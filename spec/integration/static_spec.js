const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/';

describe('routes : static', () => {

	describe('GET /', () => {
		it('should return status code 200 and have "Welcome to Bloccit" in the body of the response', (done) => {
			request.get(base, (err, res, body) => {
				expect(body).toContain('Welcome to Bloccit');
				done();
			});
		});
	});

	describe('GET /marco', () => {
		it('should return status code 200 and "polo" as the body', (done) => {
			request.get('http://localhost:3000/marco', (err, res, body) => {
				expect(res.statusCode).toBe(200);
				expect(body).toBe('polo');
				done();
			});
		});
	})

	describe('GET /about', () => {
		it('should return status code 200 and have "About Us" in the body', (done) => {
			request.get('http://localhost:3000/about', (err,res,body) => {
				expect(res.statusCode).toBe(200);
				expect(body).toBe('About Us');
				done();
			});
		});
	});

});