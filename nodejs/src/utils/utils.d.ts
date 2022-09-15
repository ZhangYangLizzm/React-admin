interface Item {
  id: number
  key: string
  pid: number
  label: string
  pagepermission: number
  children?: Item[]
}
export { Item }
