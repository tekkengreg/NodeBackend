const db = require('../db')

describe('DB', () => {
    test('primitive color exist', ()=>{
        db.each("SELECT * FROM primitive_color", function(err, row) {
                // console.log(row.id + ": " + row.info);
            expect(err).toBeNull()
            });
    })
})