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

exports['no token in empty string'] = function (test) {
    const lexer = lexers.lexer('');
    
    test.equal(lexer.next(), null);
};

exports['name skipping spaces'] = function (test) {
    const lexer = lexers.lexer('  foo   ');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['two names'] = function (test) {
    const lexer = lexers.lexer('foo bar');
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'foo');
    test.equal(token.type, TokenType.Name);
  
    var token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, 'bar');
    test.equal(token.type, TokenType.Name);
    
    test.equal(lexer.next(), null);
};

exports['integer'] = function (test) {
    const lexer = lexers.lexer('42');
  
    const token = lexer.next();
    
    test.ok(token);
    test.equal(token.value, '42');
    test.equal(token.type, TokenType.Integer);
    
    test.equal(lexer.next(), null);
};

