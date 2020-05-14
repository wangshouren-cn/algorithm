/* 
二、算法题
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。 你有多少种不同的方法可以爬到楼顶呢？
1、 使用 javascript 写出解决方案(可多种)。
*/

function foo1(n) {
  if (n < 1) return 0
  if (n === 1) {
    return 1
  } else if (n === 2) {
    return 2
  }
  return foo1(n - 1) + foo1(n - 2)
}

function foo2(n) {
  if (n < 1) return 0
  if (n === 1) {
    return 1
  } else if (n === 2) {
    return 2
  }
  let res = 2,
    pre = 1,
    tmp
  for (let i = 3; i <= n; i++) {
    tmp = res
    res += pre
    pre = tmp
  }
  return res
}

