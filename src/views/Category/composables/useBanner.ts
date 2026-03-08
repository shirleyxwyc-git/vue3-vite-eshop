//封裝輪播圖業務相關代碼
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'
//state
export const useBanner = () => {
  const bannerList = ref<any[]>([])

  //actions
  const getBanner = async () => {
    const params = { distributionSite: '2' }
    const res = await getBannerAPI(params)
    bannerList.value = res.result
  }

  onMounted(() => {
    getBanner()
  })
  return { bannerList, getBanner }
}
