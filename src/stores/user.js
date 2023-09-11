import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user.js'
import { useCartStore } from '@/stores/cartStore'
import {mergeCartAPI } from '@/apis/cart'
//管理用户的相关数据
export const useUserStore = defineStore('user', () => { 
  const cartStore = useCartStore()
  // 定义管理用户的state
  const userInfo = ref({})
  // 定义获取接口数据的action函数
  const getUserInfo = async ({account,password}) => { 
    const res = await loginAPI({account,password})
    userInfo.value = res.result
    //合并购物车的操作
    await mergeCartAPI(cartStore.cartlist.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count:item.count
      }
    }))
    cartStore.updateNewCart()
  }
  //退出时清楚 用户的信息 购物车的信息
  const clearUserInfo = () => { 
    userInfo.value = {}
    cartStore.clearCart()
  }
  return {
    getUserInfo,
    userInfo,
    clearUserInfo
  }
},
{
persist:true
}
)
       

