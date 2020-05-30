import { TreeNode, buildTree } from "../utils/Tree";
import minDepth from "./57";
/* 
如何直观打印一棵二叉树
*/

function printTree(head: TreeNode) {
  printNode(head, 0, "H", 17);
}
function printNode(node: TreeNode, height: number, to: string, len: number) {
  if (node == null) return;
  printNode(node.right, height + 1, "v", len);
  let val = to + node.data + to;
  const leftL = Math.trunc(len - String(val).length);
  const rightL = len - String(val).length - leftL;
  val = "-".repeat(height * len + leftL) + val + "-".repeat(rightL);
  console.log(val);
  printNode(node.left, height + 1, "^", len);
}
// printTree(buildTree(10));

function printTree2(head: TreeNode) {
  console.log("minDepth(head)", minDepth(head));
  printNode2(head, minDepth(head), {});
}
function printNode2(
  head: TreeNode,
  height: number,
  cache: Record<string, boolean>
) {
  if (head == null) return;
  if (!cache[height]) {
    //当前节点是最左节点
    console.log(cache[height-1])
    cache[height] = true;
    console.log(" ".repeat(height) + head.data); //     ----------1
    for (let i = 1; i < height; i++) {
      console.log(
        " ".repeat(height - i) + "/" + " ".repeat((i - 1) * 2) + " \\"
      );
    }
    printNode2(head.left, height - 1, cache);
  }else{

  }

  //   printNode2(head.right, minDepth(head.right));
}
printTree2(buildTree(3));
