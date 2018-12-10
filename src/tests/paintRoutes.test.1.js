// const {
//     Express
// } = require('jest-express/lib/express');
const server = require('../index.js');
const request = require('supertest');

let app;

describe('Server', () => {
    beforeEach(() => {
        // app = new Express();
    });

    afterEach(() => {
        server.close();
    });

    // test('should setup server', () => {
    //     const options = {
    //         port: 3000,
    //     };

    //     // expect(server.address().port).toBe(options.port)
    //     server(app, options);

    //     expect(app.set).toBeCalledWith('port', options.port);
    // });
    test('try /', (done) => {
        request(server)
            .get('/')
            .expect(200, done);
    });
    test('try anything', (done) => {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});