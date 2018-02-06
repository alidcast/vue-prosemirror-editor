export const findNode = function (topNode, predicate) {
  let found
  topNode.descendants((node, pos, parent) => {
    if (predicate(node)) found = { node, pos, parent }
    if (found) return false
  })
  return found
}
