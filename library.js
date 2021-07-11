export function convertStringToHex(input) {
  return input
    .split('')
    .reduce(
      (hex, c) => (hex += c.charCodeAt(0).toString(16).padStart(2, '0')),
      '',
    )
}
