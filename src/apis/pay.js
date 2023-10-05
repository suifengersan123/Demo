import httpInstance from "@/utils/http";

export function getOrderAPI(id){
    return httpInstance({
        url:`/member/order/${id}`
    })
}