import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
  install(app) {
    //定义一个全局的指令
app.directive('img-lazy', {
  mounted(el, binding) { 
    //el指令绑定的元素
    //binding: 表达式的值
    // console.log(el, binding.value);
    const { stop} = useIntersectionObserver(
           el,
      ([{ isIntersecting }]) => {
        // console.log(isIntersecting)
        if (isIntersecting) { 
          el.src = binding.value
          
          stop()
        }
      },
    )
  }
})
   }
}