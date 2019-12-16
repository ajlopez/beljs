
const lists = require('../lib/lists');

exports['create pair'] = function (test) {
    const result = lists.pair(1, 2);
    
    test.ok(result);
    test.equal(result.head(), 1);
    test.equal(result.tail(), 2);
};

exports['create pair without tail'] = function (test) {
    const result = lists.pair(1);
    
    test.ok(result);
    test.equal(result.head(), 1);
    test.strictEqual(result.tail(), null);
};

exports['create list with three elements'] = function (test) {
    const result = lists.list([1, 2, 3]);
    
    test.ok(result);
    test.equal(result.head(), 1);
    test.equal(result.tail().head(), 2);
    test.equal(result.tail().tail().head(), 3);
    test.strictEqual(result.tail().tail().tail(), null);
};

exports['create list with zero elements as nil'] = function (test) {
    const result = lists.list([]);
    
    test.strictEqual(result, null);
};

exports['create list with three elements and non nil tail'] = function (test) {
    const result = lists.list([1, 2, 3], 4);
    
    test.ok(result);
    test.equal(result.head(), 1);
    test.equal(result.tail().head(), 2);
    test.equal(result.tail().tail().head(), 3);
    test.equal(result.tail().tail().tail(), 4);
};

exports['is list'] = function (test) {
    test.equal(lists.isList(null), true);
    test.equal(lists.isList(lists.list([1, 2, 3])), true);
    test.equal(lists.isList(lists.list([1, 2, 3], 4)), true);
    
    test.equal(lists.isList(0), false);
    test.equal(lists.isList('foo'), false);
};

exports['to string'] = function (test) {
    test.equal(lists.toString(null), "nil");
    test.equal(lists.toString(lists.list([1, 2, 3])), '(1 2 3)');
    test.equal(lists.toString(lists.list([1, 2, 3], 4)), '(1 2 3 . 4)');
    test.equal(lists.toString(lists.list([lists.list([1]), 2, 3], 4)), '((1) 2 3 . 4)');
};

exports['replace head in pair'] = function (test) {
    const pair = lists.pair(1, 2);
    
    pair.head(42);
    
    test.strictEqual(pair.head(), 42);
};

exports['replace tail in pair'] = function (test) {
    const pair = lists.pair(1, 2);
    
    pair.tail(42);
    
    test.strictEqual(pair.tail(), 42);
};

