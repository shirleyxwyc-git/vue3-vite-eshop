//定義懶加載插件
import { useIntersectionObserver } from '@vueuse/core'
import loadingImg from '@/assets/images/loading.gif'

// 定义懒加载插件

export const lazyPlugin = {
  install(app: {
    //懶加載指令邏輯
    directive: (
      arg0: string,
      arg1: { mounted(el: any, binding: any): void }, // el: 指令绑定的那个元素 img
    ) => void
  }) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted(el, binding) {
        el.src = loadingImg
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        const { stop } = useIntersectionObserver(el, ([entry]) => {
          if (entry && entry.isIntersecting) {
            // 进入视口区域
            el.src = binding.value
            stop()
          }
        })
      },
    })
  },
}
