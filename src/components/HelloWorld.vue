<template>
  <div class="banner">
  <div class="bannerImg">
    <transition-group tag="div">
      <span v-for="(v,i) in banners" :key="i" :style="{opacity:(i+1)==n?'1':'0'}" class="active">
        {{v}}
      </span>
    </transition-group>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      banners:['1','2','3','4','5','6'],
         n:1,　　　　　　　// 图片的index。
         bFlag:true,      // 锁定
         timer1:'',　　　　// 这是bFlag定时器的数据
         timer2:'',　　　　// 这是自动播放（next（））定时器的数据
         timer3:''　　　   // 这是打开浏览器时，初始运动定时器的数据
    }
  },
  methods:{
    next(){
        // 下一张　　　
        // 为了避免连续点击。让bFlag运动结束后再变为true。　　　　　　　　　　　　　　
        if(this.bFlag){　　　　　　　　　　　　
            this.bFlag=false;
            this.clearT();　　　　　　　　　   // 运动之前，清除所有定时器。
            this.n=this.n+1==this.banners.length?1:this.n+1;　  
            // 下一张，如果是第4张，就返回第一张。
            // 调用timeout函数，延迟进入下一次轮播，以便可以点击切换。
            this.timeout();
        }
    },
    clearT(){
        // 清除所有定时器　　　　　　　　　　　　　　　
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
    },
    timeout(){　　　　　　
        // 运动结束后设置bFlag为true，并且3秒后调用next，进行下一次运动。
        // 运动时间是1s。
        this.timer2=setTimeout(()=>{
            this.bFlag=true
        },1000);
        this.timer1=setTimeout(()=>{
            this.next()
        },3000);
    }
  },
  mounted(){
    this.timer3=setTimeout(this.next,3000);
  }
}
</script>
<style scoped>
.banner{
    position: relative;
    border: 1px solid rgb(189, 172, 172);
    width: 100px;
}
.bannerImg{
    position: relative;
    height: 30px;
    overflow: hidden;    
}
.bannerImg span{
    position: absolute;
    top:0;
    left: 0;
}
.bannerImg span.active{
    transition:all 1s;
}
.bannerBtn{
    width: 200px;
    position:absolute;
    left:50%;
    margin-left:-100px;
    bottom:22px;
    text-align:center;
}
.bannerBtn li{
  list-style: none;
    margin: 0 13px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    float:left;
    background: rgba(255,255,255,.4);
 }
.bannerBtn li a{
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin: 3px;
} 
.bannerBtn li a.aBtn{
    transition:all .6s ease;
}
</style>
