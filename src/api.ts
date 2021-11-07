//引入你配置的axios
import req from './http'
import  {City} from '@/types/enum';

const sceneProperty ="$select=ID%2CCity%2CName%2CDescriptionDetail%2CPhone%2CAddress%2CTravelInfo%2COpenTime%2CWebsiteUrl%2CTicketInfo%2CRemarks%2CParkingPosition%2CPicture%2CPosition&"
const foodProperty = "$select=ID%2CName%2CDescription%2CPhone%2COpenTime%2CWebsiteUrl%2CAddress%2CPicture%2CPosition&"
const hotelProperty = "$select=ID%2CName%2CDescription%2CGrade%2CAddress%2CPhone%2CWebsiteUrl%2CPicture%2CPosition%2CServiceInfo%2CSpec&"
const activityProperty = "$select=ID%2CName%2CDescription%2CParticpation%2CLocation%2CAddress%2CPhone%2COrganizer%2CStartTime%2CEndTime%2CWebsiteUrl%2CPicture%2CPosition%2CClass1%2CClass2%2CCharge%2CRemarks&"
//旅遊景點API
export const getAllTourismData = (top = 200) => {
  return req('get',`/v2/Tourism/ScenicSpot?${sceneProperty}$top=${top}&$format=JSON`)
}

export const getTourismDataByCity = (city:City,top = 200) => {  //給預設的靜態頁面使用
  return req('get',`/v2/Tourism/ScenicSpot/${city}?${sceneProperty}$top=${top}&$format=JSON`)
}

//餐飲API
export const getAllRestaurant = (top = 30) => {
  return req('get',`/v2/Tourism/Restaurant?${foodProperty}$top=${top}&$format=JSON`)
}
export const getRestaurantByCity = (city:City,top = 200) => {
  return req('get',`/v2/Tourism/Restaurant/${city}?${foodProperty}$top=${top}&$format=JSON`)
}

//旅宿
export const getAllHotel = (top = 30) => {
  return req('get',`/v2/Tourism/Hotel?${hotelProperty}$top=${top}&$format=JSON`)
}
export const getHotelByCity = (city:City,top = 200) => {
  return req('get',`/v2/Tourism/Hotel/${city}?${hotelProperty}$top=${top}&$format=JSON`)
}

//活動
export const getAllActivity = (top = 30) => {
  return req('get',`/v2/Tourism/Activity?${activityProperty}$top=${top}&$format=JSON`)
}
export const getActivityByCity = (city:City,top = 200) => {
  return req('get',`/v2/Tourism/Activity/${city}?${activityProperty}$top=${top}&$format=JSON`)
}