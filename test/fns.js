
const fns = require('../lib/fns');
const symbols = require('../lib/symbols');
const lists = require('../lib/lists');

exports['create fn with no arguments'] = function (test) {
    const fn = fns.fn(null, 42);
    
    test.ok(fn);
    test.ok(fns.isFn(fn));
    test.equal(fn.evaluate(), 42);
};

exports['create fn with one arguments'] = function (test) {
    const x = symbols.symbol('x');
    const args = lists.list([ x ]);
    const fn = fns.fn(args, x);
    
    test.ok(fn);
    test.ok(fns.isFn(fn));
    test.equal(fn.evaluate([ 42 ]), 42);
};

