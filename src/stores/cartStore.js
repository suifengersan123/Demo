//封装购物车模块
import { defineStore} from 'pinia'
import { ref,computed } from 'vue';
import { useUserStore } from './userStore';
import { insertCartAPI,findNewCartListAPI,delCartAPI } from '@/apis/cart';
export const useCartStore=defineStore('cart',()=>{
    const userStore=useUserStore();
    const isLogin=computed(()=>{
        return userStore.userInfo.token;
    });
    // 定义一个state
    const cartList=ref([]);
    const updateCartList=async()=>{
        const res=await findNewCartListAPI();
        cartList.value=res.result;
    }
    //定义action
    const addCart=async(goods)=>{
        const {skuId,count} = goods;
        if(isLogin.value){
            await insertCartAPI({skuId,count});
            updateCartList();
        }else{
            //添加购物车操作
            //已添加的count+1 没有的直接push
            const item=cartList.value.find((item)=>{
                return goods.skuId===item.skuId;
            });
            if(item) {
                item.count++;
            }else{
                cartList.value.push(goods);
            }
        }
        
    };

    //删除
    const delCart=async(skuId)=>{
        if(isLogin.value){
            await delCartAPI([skuId]);
            updateCartList();
        }else{
            const idx=cartList.value.findIndex((item)=>{
                return item.skuId===skuId;
            });
            cartList.value.splice(idx,1);
        }
    };
    //清除购物车
    const clearCart=()=>{
        cartList.value=[];
    }
    //计算属性
    //总的数量
    const allCount=computed(()=>{
        return cartList.value.reduce((a,c)=>{
            return a+c.count;
        },0);
    });
    //总价
    const allPrice=computed(()=>{
        return cartList.value.reduce((a,c)=>{
            return a+c.count*c.price;
        },0);
    });
    //已选择数量
    const selectedCount=computed(()=>{
        return cartList.value.filter(item=>item.selected).reduce((a,c)=>{
            return a+c.count;
        },0); 
    });
    const selectedPrice=computed(()=>{
        return cartList.value.filter(item=>item.selected).reduce((a,c)=>{
            return a+c.count*c.price;
        },0); 
    });
    //是否全选
    const isAll=computed(()=>{
        return cartList.value.every((item)=>{
            return item.selected;
        });
    });
    //单选功能
    const singleCheck=(skuId,selected)=>{
        //通过skuId找到修改的项
        const item=cartList.value.find((item)=>{
            return item.skuId===skuId;
        });
        item.selected=selected;
    };
    //全选功能
    const allCheck=(selected)=>{
        cartList.value.forEach((item)=>{
            item.selected=selected;
        })
    }
    //返回
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateCartList
    }
},{
    persist:true
});