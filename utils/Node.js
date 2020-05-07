class Node {
  constructor(data) {
    this.data = data
    this.next = null
    this.last = null
  }
  log() {
    let res = `${this.data}`
    let cur = this
    while (cur.next) {
      cur = cur.next
      res += `${cur.last ? '<->' : '->'}${cur.data}`
    }
    console.log(res)
  }
}
const node = (Node.example = new Node(1))
node.next = new Node(2)
node.next.next = new Node(3)
node.next.next.next = new Node(4)
node.next.next.next.next = new Node(5)
module.exports = Node
