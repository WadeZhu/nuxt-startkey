function swapArray (arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

export default function (arr) {
  if (!arr || !arr.length) return null
  return Number(swapArray(arr, 1, arr.length - 2).join(''))
}