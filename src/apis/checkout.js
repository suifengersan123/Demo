import httpInstance from "@/utils/http";

export function getCheckInfoAPI(){
    return httpInstance({
        url:'/member/order/pre'
    })
}

// 创建订单
export function createOrderAPI(data){
    return httpInstance({
        url:'/member/order',
        method:'POST',
        data
    })
}