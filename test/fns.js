
const fns = require('../lib/fns');

exports['create fn with no arguments'] = function (test) {
    const fn = fns.fn(null, 42);
    
    test.ok(fn);
    test.ok(fns.isFn(fn));
    test.equal(fn.evaluate(), 42);
};

