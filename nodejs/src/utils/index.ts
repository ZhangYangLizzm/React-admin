import { Item } from './utils'
//扁平化结果转树形结构 arrayToTree
export const arrayToTree = (arr: Item[], id: number): Item[] => {
  const res = []
  for (const item of arr) {
    if (item.pid === id) {
      // 找到当前id的子元素
      // 插入子元素，每个子元素的children通过回调生成
      const children = arrayToTree(arr, item.id)
      if (children.length > 0) {
        res.push({ ...item, children})
      } else {
        res.push(item)
      }
    }
  }
  return res
}
