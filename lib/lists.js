
function Pair(head, tail) {
    this.head = function () { return head; };
    this.tail = function () { return tail; };
}

function createPair(head, tail) {
    return new Pair(head, tail);
}

function createList(elements) {
    let result = null;
    
    for (let k = 0, l = elements.length; k < l; k++)
        result = createPair(elements[l - k - 1], result);
    
    return result;
}

module.exports = {
    pair: createPair,
    list: createList
};

