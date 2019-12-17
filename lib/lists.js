
const evaluate = require('./evaluate');
const top = require('./top');
const fns = require('./fns');

function quote(args) {
    return args[0];
}

quote.special = true;

top.set('join', function (args) { return createPair(args[0], args[1]); });
top.set('car', function (args) { if (args[0] === null) return null; return args[0].head(); });
top.set('cdr', function (args) { if (args[0] === null) return null; return args[0].tail(); });
top.set('xar', function (args) { args[1].head(args[0]); return args[1]; });
top.set('xdr', function (args) { args[1].tail(args[0]); return args[1]; });
top.set('list', function (args) { return createList(args); });
top.set('quote', quote);

function Pair(head, tail) {
    if (tail === undefined)
        tail = null;
    
    this.head = function (newhead) { if (newhead !== undefined) head = newhead; return head; };
    this.tail = function (newtail) { if (newtail !== undefined) tail = newtail; return tail; };
    
    this.evaluate = function (context) {
        const fn = head.evaluate(context);
        
        const args = expand(tail);
        
        if (!fn.special)
            for (let k = 0, l = args.length; k < l; k++)
                args[k] = evaluate(args[k], context);
            
        if (fns.isFn(fn))
            return fn.evaluate(args);
        
        return fn(args, context);
    };
    
    function expand(pair) {
        if (pair == null)
            return [];
        
        const first = pair.head();
        const rest = expand(pair.tail());
        
        rest.unshift(first);
        
        return rest;
    }
}

function createPair(head, tail) {
    return new Pair(head, tail);
}

function createList(elements, tail) {
    let result = tail === undefined ? null : tail;
    
    for (let k = 0, l = elements.length; k < l; k++)
        result = createPair(elements[l - k - 1], result);
    
    return result;
}

function isList(value) {
    return value === null || value instanceof Pair;
}

function toListString(value) {
    if (value == null)
        return '';
    
    if (!isList(value))
        return value.toString();
    
    let result = toString(value.head());
    
    const tail = value.tail();
    
    if (!isList(tail))
        return result + ' . ' + toString(tail);
    
    const rest = toListString(tail);
    
    if (rest !== '')
        result += ' ';
    
    result += rest;
    
    return result;
}

function toString(value) {
    if (value == null)
        return 'nil';
    
    if (isList(value)) {
        let result = '(';
        
        result += toString(value.head());
        
        const tail = value.tail();
        
        if (isList(tail)) {
            const rest = toListString(tail);
            
            if (rest !== '')
                result += ' ';
            
            result += rest + ')';
            
            return result;
        }
        
        result += ' . ' + toString(tail);
        
        result += ')';
        
        return result;
    }
    
    return value.toString();
}

module.exports = {
    pair: createPair,
    list: createList,
    isList: isList,
    toString: toString
};

