
const lists = require('../lib/lists');

exports['create pair'] = function (test) {
    const result = lists.pair(1, 2);
    
    test.ok(result);
    test.equal(result.head(), 1);
    test.equal(result.tail(), 2);
};

