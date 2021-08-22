const assert = require('assert');
const Tmdb = require('../../../src/tmdb-js/tmdb-js').Tmdb;

exports.runTest = apiKey => {

    let tmdb = new Tmdb(apiKey);

    describe('People GET query tests', () => {

        // TODO [david98hall, 2021-08-14]: Test all GET query methods

        it('Should find data about a person.', done => {

            // Look for person data
            let person = {id: "37014", name: "Lauren German", birthday: "1978-11-29"};
            
            tmdb.getPeople().getPerson(person.id).getDetails().then(json => {
              
                // Assert the results
                assert.strictEqual(json.name, person.name);
                assert.strictEqual(json.birthday, person.birthday);
                
                setImmediate(done);
            })
        });
    });
}