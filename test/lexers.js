const lexers = require('../lib/lexers');
const TokenType = lexers.TokenType;

exports['create lexer as object'] = function (test) {
    const lexer = lexers.lexer('foo');
    
    test.ok(lexer);
    test.equal(typeof lexer, 'object');
};

exports['first token'] = function (test) {
    const lexer = lexers.lexer('foo');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

