
const symbols = require('../lib/symbols');

exports['create symbol'] = function (test) {
    const result = symbols.symbol('foo');
    
    test.ok(result);
    test.equal(result.name(), 'foo');
    test.equal(result.toString(), 'foo');
};

exports['cannot create symbol with name not string'] = function (test) {
    try {
        symbols.symbol(42);
    }
    catch (ex) {
        return;
    }
    
    test.fail();
};

exports['is symbol'] = function (test) {
    const foo = symbols.symbol('foo');
    
    test.ok(symbols.isSymbol(foo));
    test.ok(!symbols.isSymbol(42));
    test.ok(!symbols.isSymbol('foo'));
};

