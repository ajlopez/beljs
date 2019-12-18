
const evaluate = require('./evaluate');
const parser = require('./parser');

function execute(text) {
    const code = '(do ' + text + ')';
    const expression = parser.parse('expression', code);
    
    return evaluate(expression);
}

module.exports = {
    evaluate: evaluate,
    execute: execute
}