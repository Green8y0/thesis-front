export default function classNames(...names: any[]) {
  const items: string[] = []
  for (const name of names) {
    if (typeof name !== 'object') items.push(name)
    else if (Array.isArray(name) === false) {
      for (const key in name) {
        if (!!name[key]) items.push(key)
      }
    }
  }
  return items.join(' ')
}
