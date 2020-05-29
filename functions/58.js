"use strict";
exports.__esModule = true;
var Tree_1 = require("../utils/Tree");
/*
如何直观打印一棵二叉树
*/
function printTree(head) {
    printNode(head, 0, "H", 17);
}
function printNode(node, height, to, len) {
    if (node == null)
        return;
    printNode(node.right, height + 1, "v", len);
    var val = to + node.data + to;
    var leftL = Math.trunc(len - String(val).length);
    var rightL = len - String(val).length - leftL;
    val = "-".repeat(height * len + leftL) + val + "-".repeat(rightL);
    console.log(val);
    printNode(node.left, height + 1, "^", len);
}
printTree(Tree_1.buildTree(10));
