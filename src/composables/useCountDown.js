import { ref,computed,onUnmounted } from 'vue'
import dayjs from 'dayjs'

//封装倒计时逻辑函数
export const useCountDown=()=>{
    let timer=null;
    //1.响应式的数据
    const time=ref(0);
    //格式化时间
    const formatTime=computed(()=>{
        return dayjs.unix(time.value).format('mm分ss秒');
        })
    //2.开启倒计时的函数
    const start=(currentTime)=>{
        // 开启倒计时的逻辑 每隔一秒钟减1
        time.value=currentTime;
        timer=setInterval(()=>{
            time.value--;
        },1000);

    };
    onUnmounted(() => {
        timer && clearInterval(timer);
    });
    return {
        formatTime,
        start
    }


}