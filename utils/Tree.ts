import Queue from './Queue'
export interface TreeNodeInterface {
  data: any
  left: TreeNode
  right: TreeNode
  parent?: TreeNode
}
export class TreeNode implements TreeNodeInterface {
  data: any
  left: TreeNode
  right: TreeNode
  parent?: TreeNode
  constructor(data: any, parent?: TreeNode) {
    this.data = data
    this.left = this.right = null
    if (typeof parent !== 'undefined') this.parent = parent
  }
  log() {
    printTree(this)
  }
}
export function printTree(head: TreeNode) {
  printNode(head, 0, 'H', 17)
}
function printNode(node: TreeNode, height: number, to: string, len: number) {
  if (node == null) return
  printNode(node.right, height + 1, 'v', len)
  let val = to + node.data + to
  const leftL = Math.trunc(len - String(val).length)
  const rightL = len - String(val).length - leftL
  val = ' '.repeat(height * len + leftL) + val + '-'.repeat(rightL)
  console.log(val)
  printNode(node.left, height + 1, '^', len)
}
export function buildTree(
  size: number,
  includeParent: boolean,
  value: number
): TreeNode {
  if (size < 1) return null
  const queue = new Queue<TreeNode>()
  const head = new TreeNode(1, null)
  queue.add(head)
  let currentSize = 1
  while (currentSize != size) {
    const node = queue.poll()
    ++currentSize
    queue.add(
      (node.left = new TreeNode(
        value ? Math.round(Math.random() * value) : currentSize,
        includeParent ? node : undefined
      ))
    )
    if (currentSize === size) {
      return head
    } else {
      queue.add(
        (node.right = new TreeNode(
          value ? Math.round(Math.random() * value) : currentSize,
          includeParent ? node : undefined
        ))
      )
    }
  }
  return head
}
