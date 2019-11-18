
const bel = require('..');

exports['evaluate constants'] = function (test) {
    test.equal(bel.evaluate(42), 42);
    test.equal(bel.evaluate(false), false);
    test.equal(bel.evaluate(true), true);
    test.equal(bel.evaluate("foo"), "foo");
}

