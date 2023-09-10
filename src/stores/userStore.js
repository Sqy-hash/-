import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
//管理用户的相关数据
export const useUserStore = defineStore('user',() => { 
  // 定义管理用户的state
  const userInfo = ref({})
  // 定义获取接口数据的action函数
  const getUserInfo = async ({account,password}) => { 
    const res = await loginAPI({account,password})
    userInfo.value = res.result
  }
  const clearUserInfo = () => { 
   userInfo.value = {}
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
       

