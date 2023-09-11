import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { inserCartAPI,findNewCartListAPI,DelCartAPI } from '@/apis/cart.js'


export const useCartStore = defineStore('cart', () => {
  //定义一个通用的获取购物车的方法
  const userStore = useUserStore()
  const updateNewList =async () => {
    const res = await findNewCartListAPI()
       cartlist.value = res.result
   }
  // 1.定义购物车的state
  const cartlist = ref([])
   // 2.定义action  添加购物车的操作
   const isLogin = computed(() => userStore.userInfo.token) //判断是否含有token
   const addCart =async (goods) => {
    // 通过skuId判断是否已经添加过
    //  已经添加过 count++
     // 没有添加过 push
     const { skuId,count} = goods
     if (isLogin.value) {
       await inserCartAPI({skuId,count})
       updateNewList()
     } else {
      const item = cartlist.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count++
      } else {
        cartlist.value.push(goods)
      }}
   }
   //删除购物车
   const delCart = async(skuId) => {
     //  找到要删除元素的下标值  splice
     if (isLogin.value) {
       await DelCartAPI([skuId])
       updateNewList()
     } else {
      const idx = cartlist.value.findIndex((item) => skuId === item.SkuId)
      cartlist.value.splice(idx,1)
     }
     
   }
   //在计算属性累加数据
  //  计算所有count之和
   const allCount = computed(() => cartlist.value.reduce((a, c) => a + c.count, 0))
   //  总价 count*price
  const allprice = computed(() => cartlist.value.reduce((a, c) => a + c.count*c.price, 0))
   //多选属性
   const isAll = computed(() => cartlist.value.every((item) => item.selected))


   //全选功能
   const allCheck = (selected) => {
    //  通过遍历得到每一项,并修改选中状态
     cartlist.value.forEach(item=> item.selected = selected)
   }
   //单选功能
   const singleCheck = (skuId,selected) => {
     const item = cartlist.value.find((item) => item.skuId === skuId)
     item.selected = selected
  }
  //清楚购物车
  const clearCart = () => {
    cartlist.value = []
  }
   //选中商品的数目和价格
   const selectedCount = computed(() => cartlist.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
   const selectedPrice = computed(()=>cartlist.value.filter(item => item.selected).reduce((a, c) => a + c.count*c.price, 0))
    return {
    cartlist,
      addCart,
      delCart,
      isAll,
      allCheck,
      allCount,
      allprice,
      clearCart,
      singleCheck,
      selectedCount,
      selectedPrice,
      updateNewList
    }
 },
   {
     persist:true
   }
 )

