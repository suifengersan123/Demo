import httpInstance from "@/utils/http";


export function getDetailAPI(id){
    return httpInstance({
        url:'/goods',
        params:{
            id
        }
    })
}

export function getHotGoodsAPI({id,type,limit=3}){
    return httpInstance({
        url:'/goods/hot',
        params:{
            id,
            type,
            limit
        }
    })
}