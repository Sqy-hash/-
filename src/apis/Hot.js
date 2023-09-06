import httpInstance from "@/utils/http";
export function getHotAPI(){ 
  return httpInstance({
    url:'/home/hot'
  })
}