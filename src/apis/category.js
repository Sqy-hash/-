import request from '@/utils/http'
  
export function getCategoryAPI(id){ 
  return request({
    url: '/category',
    params: {
      id
    }
  })
}
// 二级路由数据
export const getCategoryFilterAPI = (id) => {
  return request({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}
// 获取导航列表数据
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
   export const getSubCategoryAPI = (data) => {
    return request({
      url:'/category/goods/temporary',
      method:'POST',
      data
    })
  }
