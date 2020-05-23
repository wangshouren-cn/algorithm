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
  constructor(data, parent?: TreeNode) {
    this.data = data
    this.left = this.right = null
    if (typeof parent !== 'undefined') this.parent = parent
  }
}
export function buildTree(size: number, includeParent?: boolean): TreeNode {
  if (size < 1) return null
  const queue = new Queue<TreeNode>()
  const head = new TreeNode(1, null)
  queue.add(head)
  let currentSize = 1
  while (currentSize != size) {
    const node = queue.poll()
    queue.add(
      (node.left = new TreeNode(
        ++currentSize,
        includeParent ? node : undefined
      ))
    )
    if (currentSize === size) {
      return head
    } else {
      queue.add(
        (node.right = new TreeNode(
          ++currentSize,
          includeParent ? node : undefined
        ))
      )
    }
  }
  return head
}
