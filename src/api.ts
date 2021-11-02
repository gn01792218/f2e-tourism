//引入你配置的axios
import req from '@/http'
export const getAllTourismData = (top = 30)=>{
  return req('get',`/v2/Tourism/ScenicSpot?$top=${top}&$format=JSON`)
}
export const getTourismDataByCity = (city:City,top = 30)=>{
  return req('get',`/v2/Tourism/ScenicSpot/${city}?$top=${top}&$format=JSON`)
}
export const getAllRestaurant = (top = 30) =>{
  return req('get',`/v2/Tourism/Restaurant?$top=${top}&$format=JSON`)
}
export const getRestaurantByCity = (city:City,top = 30)=>{
  return req('get',`/v2/Tourism/Restaurant/${city}?$top=${top}&$format=JSON`)
}