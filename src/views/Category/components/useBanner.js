import { onMounted, ref } from 'vue';
import { getBannerAPI } from '@/apis/home.js'


export function usrBanner() {
  // 获取Banner
  const BannerList = ref([])
  const getBannerList = async() => { 
    const res = await getBannerAPI({
      distributionSite:'2'
    })
    BannerList.value = res.result
  }
  onMounted(() => {
    getBannerList()
  })
  return {
    BannerList
  }
}
