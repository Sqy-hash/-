import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

 export const useCartStore = defineStore('cart',() => { 
  // 1.定义购物车的state
  const cartlist = ref([])
  // 2.定义action  添加购物车的操作
   const addCart = (goods) => { 
    // 通过skuId判断是否已经添加过
    //  已经添加过 count++
    // 没有添加过 push
     const item = cartlist.value.find((item) => goods.skuId === item.skuId)
     if (item) {
       item.count++
     } else { 
       cartlist.value.push(goods)
     }
   } 
   //删除购物车
   const delCart = (SkuId) => { 
     //  找到要删除元素的下标值  splice
     const idx = cartlist.value.findIndex((item) => SkuId === item.SkuId)
     cartlist.value.splice(idx,1)
   }
   //在计算属性累加数据
  //  计算所有count之和
   const allCount = computed(() => cartlist.value.reduce((a, c) => a + c.count, 0))
   //  总价 count*price
  const allprice = computed(() => cartlist.value.reduce((a, c) => a + c.count*c.price, 0))

    return { 
    cartlist,
      addCart,
      delCart,
      allCount,
      allprice
    }
 },
   {
     persist:true
   }
 )