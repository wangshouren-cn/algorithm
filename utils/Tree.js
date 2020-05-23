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
    return TreeNode;
}());
exports.TreeNode = TreeNode;
function buildTree(size, includeParent) {
    if (size < 1)
        return null;
    var queue = new Queue_1["default"]();
    var head = new TreeNode(1, null);
    queue.add(head);
    var currentSize = 1;
    while (currentSize != size) {
        var node = queue.poll();
        queue.add((node.left = new TreeNode(++currentSize, includeParent ? node : undefined)));
        if (currentSize === size) {
            return head;
        }
        else {
            queue.add((node.right = new TreeNode(++currentSize, includeParent ? node : undefined)));
        }
    }
    return head;
}
exports.buildTree = buildTree;
