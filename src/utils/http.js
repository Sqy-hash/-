import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from '@/router'

// 创建一个axios的实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
// 在发送请求之前做些什么
httpInstance.interceptors.request.use(config => {
  //  1.从pinia获取token数据
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
 },e => Promise.reject(e))
  



// 添加响应拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 对响应数据做点什么
  const userStore = useUserStore()

  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  //401token失效处理
  if (e.response.status === 401) {
    // 清楚用户本地数据
    userStore.clearUserInfo()
    router.push('/login')
     
  }
  return Promise.reject(e)
});

export default httpInstance