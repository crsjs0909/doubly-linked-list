const Node = require('./node');

class LinkedList {

    constructor() {
        this.hd = new Node(null, null, null);
        this.hd.prev = this.hd;
        this.hd.next = this.hd;
        this.length = 0;
        this.syncHd();
    }

    append(data) {
        let node = new Node(data, this.hd.prev, this.hd);
        this.hd.prev.next = node;
        this.hd.prev = node;
        this.length++;
        this.syncHd();
        return this;
    }

    head() {
        return this.hd.next.data;
    }

    tail() {
        return this.hd.prev.data;
    }

    at(index) {
        return this.nodeAt(index).data;
    }

    nodeAt(index) {
        if (index >= this.length || index < 0)
            throw "IndexOutOfBoundException: " + index;
        let ptr = this.hd.next;
        for (let i = 0; i < index; i++) {
            ptr = ptr.next;
        }
        return ptr;
    }

    syncHd() {
        this._head = this.hd.next;
        this._tail = this.hd.prev;
    }

    insertAt(index, data) {
        if (index < 0 || index > this.length)
            throw "IndexOutOfBoundException: " + index;
        if (index === this.length)
            return this.append(data);
        else {
            let nextNode = this.nodeAt(index);
            let prevNode = nextNode.prev;
            let currNude = new Node(data, prevNode, nextNode);
            prevNode.next = currNude;
            nextNode.prev = currNude;
            this.length++;
        }
        this.syncHd();
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.hd.prev = this.hd;
        this.hd.next = this.hd;
        this.length = 0;
        this.syncHd();
        return this;
    }

    deleteAt(index) {
        if (index < 0 || index >= this.length)
            throw "IndexOutOfBoundException: " + index;
        let currNode = this.nodeAt(index);
        let prevNode = currNode.prev;
        let nextNode = currNode.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        this.length--;
        this.syncHd();
        return this;
    }

    reverse() {
        let node = this.hd;
        for (let i = 0; i < this.length; i++) {
            node = node.next;
            let tmp = node.next;
            node.next = node.prev;
            node.prev = tmp;
        }
        this.syncHd();
        return this;
    }

    indexOf(data) {
        let node = this.hd;
        for (let i = 0; i < this.length; i++) {
            node = node.next;
            if (node.data === data) {
                return i;
            }
        }
        return -1;
    }
}

module.exports = LinkedList;
