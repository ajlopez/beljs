
const bel = require('..');

exports['execute function definition and apply it'] = function (test) {
    test.equal(bel.execute('(def add (x y) (+ x y)) (add 1 41)'), 42);
};