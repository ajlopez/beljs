
const lists = require('../lib/lists');

exports['create pair'] = function (test) {
    const result = lists.pair(1, 2);
    
    test.ok(result);
    test.equal(result.head(), 1);
    test.equal(result.tail(), 2);
};

exports['create list with three elements'] = function (test) {
    const result = lists.list([1, 2, 3]);
    
    test.ok(result);
    test.equal(result.head(), 1);
    test.equal(result.tail().head(), 2);
    test.equal(result.tail().tail().head(), 3);
    test.equal(result.tail().tail().tail(), null);
};

