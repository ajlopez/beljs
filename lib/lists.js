
function Pair(head, tail) {
    this.head = function () { return head; };
    this.tail = function () { return tail; };
}

function createPair(head, tail) {
    return new Pair(head, tail);
}

module.exports = {
    pair: createPair
};

