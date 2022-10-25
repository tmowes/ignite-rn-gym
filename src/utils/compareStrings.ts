export function compareStrings(a: string, b: string): boolean {
  console.log('compareStrings', a, b)
  return a.toLowerCase() === b.toLowerCase()
}
