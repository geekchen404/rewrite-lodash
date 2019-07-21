function wrDrop(array, n = 1) {
  return n == 0 ? array : array.slice(0, n)
}