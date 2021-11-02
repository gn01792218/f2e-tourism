//引入你配置的axios
import req from '@/http'

//旅遊景點API
export const getAllTourismData = (top = 30) => {
  return req('get',`/v2/Tourism/ScenicSpot?$top=${top}&$format=JSON`)
}
export const getTourismDataByCity = (city:City,top = 30) => {
  return req('get',`/v2/Tourism/ScenicSpot/${city}?$top=${top}&$format=JSON`)
}

//餐飲API
export const getAllRestaurant = (top = 30) => {
  return req('get',`/v2/Tourism/Restaurant?$top=${top}&$format=JSON`)
}
export const getRestaurantByCity = (city:City,top = 30) => {
  return req('get',`/v2/Tourism/Restaurant/${city}?$top=${top}&$format=JSON`)
}

//旅宿
export const getAllHotel = (top = 30) => {
  return req('get',`/v2/Tourism/Hotel?$top=${top}&$format=JSON`)
}
export const getHotelByCity = (city:City,top = 30) => {
  return req('get',`/v2/Tourism/Hotel/${city}?$top=${top}&$format=JSON`)
}

//活動
export const getAllActivity = (top = 30) => {
  return req('get',`/v2/Tourism/Activity?$top=${top}&$format=JSON`)
}
export const getActivityByCity = (city:City,top = 30) => {
  return req('get',`/v2/Tourism/Activity/${city}?$top=${top}&$format=JSON`)
}