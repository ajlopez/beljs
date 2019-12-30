const contexts = require('./contexts');

let top = null;
function evaluate(value, context) {
    if (!context) {
        if (!top)
            top = require('./top');
        
        context = top;
    }
    
    if (value && value.evaluate && typeof value.evaluate === 'function')
        return value.evaluate(context);
    
    return value;
}

module.exports = evaluate;

