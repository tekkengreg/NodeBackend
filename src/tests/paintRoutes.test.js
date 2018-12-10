const server = require('../index.js');
const request = require('supertest');


describe('Server', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        server.close();
    });

    test('try /', (done) => {
        request(server)
            .get('/')
            .expect(200)
            .end(function(err, result) {
                expect(result.text).toBe("hello world")
                done();
              });
    });
    test('try anything', (done) => {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});