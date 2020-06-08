"use strict";
exports.__esModule = true;
var Queue_1 = require("./Queue");
var TreeNode = /** @class */ (function () {
    function TreeNode(data, parent) {
        this.data = data;
        this.left = this.right = null;
        if (typeof parent !== 'undefined')
            this.parent = parent;
    }
    TreeNode.prototype.log = function () {
        printTree(this);
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
function printTree(head) {
    printNode(head, 0, 'H', 17);
}
exports.printTree = printTree;
function printNode(node, height, to, len) {
    if (node == null)
        return;
    printNode(node.right, height + 1, 'v', len);
    var val = to + node.data + to;
    var leftL = Math.trunc(len - String(val).length);
    var rightL = len - String(val).length - leftL;
    val = ' '.repeat(height * len + leftL) + val + '-'.repeat(rightL);
    console.log(val);
    printNode(node.left, height + 1, '^', len);
}
function buildTree(size, includeParent, value) {
    if (size < 1)
        return null;
    var queue = new Queue_1["default"]();
    var head = new TreeNode(1, null);
    queue.add(head);
    var currentSize = 1;
    while (currentSize != size) {
        var node = queue.poll();
        ++currentSize;
        queue.add((node.left = new TreeNode(value ? Math.round(Math.random() * value) : currentSize, includeParent ? node : undefined)));
        if (currentSize === size) {
            return head;
        }
        else {
            queue.add((node.right = new TreeNode(value ? Math.round(Math.random() * value) : currentSize, includeParent ? node : undefined)));
        }
    }
    return head;
}
exports.buildTree = buildTree;
