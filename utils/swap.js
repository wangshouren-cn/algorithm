module.exports = function swap(ary, i, j) {
  let temp = ary[i]
  ary[i] = ary[j]
  ary[j] = temp
  /* ary[i] ^= ary[j];
    ary[j] ^= ary[i];
    ary[i] ^= ary[j]; */
}
