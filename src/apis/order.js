import httpInstance from "@/utils/http";

export function getUserOrderAPI(params){
    return httpInstance({
        url:'/member/order',
        method:'GET',
        params
    })
}