const Node = require('./Node')
module.exports = function (size, isDouble) {
  if (size < 1) return null
  const res = new Node(1)
  let cur = res,
    x = 2
  while (x <= size) {
    cur.next = new Node(x)
    isDouble ? (cur.next.last = cur) : null
    cur = cur.next
    x++
  }
  return res
}
