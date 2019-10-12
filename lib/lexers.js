
const gelex = require('gelex');
const ldef = gelex.definition();

const TokenType = { Name: 'name', Integer: 'integer' };

ldef.define(TokenType.Integer, '[0-9][0-9]*');
ldef.define(TokenType.Name, '[a-zA-Z_][a-zA-Z0-9_]*');

function createLexer(text) {
    return ldef.lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
}


