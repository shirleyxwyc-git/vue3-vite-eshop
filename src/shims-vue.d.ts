// TypeScript 現在可以正確識別 .vue 檔案，型別錯誤會自動消失。

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
