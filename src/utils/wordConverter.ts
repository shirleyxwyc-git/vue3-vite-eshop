import * as OpenCC from 'opencc-js'

const converter = OpenCC.Converter({ from: 'cn', to: 'hk' })

// export function toTW(text: string) {
//   return converter(text)
const toHK = (text: string) => {
  return converter(text)
}

export default toHK
