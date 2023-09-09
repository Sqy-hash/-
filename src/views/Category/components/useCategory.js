import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useRoute } from 'vue-router'
import { getCategoryAPI } from '@/apis/category'

export function useCategory() {
  // 获取面包屑数据
const categoryDate = ref({})
const route = useRoute()
const getCategory = async(id = route.params.id) => { 
  const res = await getCategoryAPI(id)
  categoryDate.value = res.result
}
onMounted(() => getCategory())
  //路由参数变化的时候，可将数据重新发送  to为一个最新的数值参数
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })
  return {
    categoryDate
  }
}
