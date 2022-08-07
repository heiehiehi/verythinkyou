<template>
  <div id="app">
    <div class="site">
      <div class="ui gery inverted fixed secondary stackable menu">
        <!-- <div class="ui container"> -->
        <div class="ui container">
          <div class="item">
            <img src="../image/Logo.png">
          </div>
          <a class="item" href="#shouye" :class="{active: isActive === 1}" @click="changeClass(1)">
            首页
          </a>
          <a class="item" href="#blog" :class="{active: isActive === 2}" @click="changeClass(2)">
            博客
          </a>
          <a class="item" href="#youlian" :class="{active: isActive === 3}" @click="changeClass(3)">友链 </a>
          <a class="item" href="#aboutus" :class="{active: isActive === 4}" @click="changeClass(4)">
            关于我们
          </a>
          <div class="right menu">
            <a class="item">登录</a>
          </div>
        </div>
      </div>
      <div>
        <div id="nav">
          <router-link to="/"></router-link>
          <router-link to="/about"></router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>


<script>
export default {
  data () {
    return {
      isActive:1,
      msg:{
        id: null,
    	  phone: "8737578",
    	  username: "k4sdask",
    	  email: "8sdasdassd@qq.com",
    	  password: "XingHui",
    	  pro: 2,
    	  hide: 0
      }
    }
  },
  methods: {
    changeClass(i) {
    this.isActive = i;
    },
    getMsg:function(){
        var user = 4;
        let formdata = new FormData();
        const json = JSON.stringify(this.msg);
        formdata.append("user",new Blob([json], {type: 'application/json'}));
        
        formdata.append("token","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NzM3NTc4IiwiaWF0IjoxNjU5NDMzODk4LCJleHAiOjE2NTk1MjAyOTh9.Tikn-XdDyTWRXzBtYTqksjeFDNC_V-N5SagDkLpMA6s");

        let config = {
          'Content-Type': 'multipart/form-data'
        }
        axios.post("http://localhost:80/Userregister",formdata,config).then(
           res =>{
              console.log(res);
              this.msg.name = res.data.data.name;
              console.log(res.data.data.name);
              this.msg.age = res.data.data.age;
              console.log(res.data.data.age);
           }
        )
    },
    SaveMsg:function(){
        axios.get(this.serverUrl+"/UserSign",JSON.stringify(this.msg))
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err); 
        })
        console.log("发送成功")
    }
  }
}
</script>



<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header{
  position: relative;
  color: #fff;
  background: rgba(1,17,27,0.5);
  width: 100%;
  overflow: hidden;
}
.background{
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(4px);
  transform: scale(1.2);
}
.end{
    position: relative;
    color: rgb(43, 43, 43);
    background: rgba(83, 83, 83, 0.8);
    width: 100%;
    height: 250px;
    overflow: hidden;
}
.con {
    position: relative;
    color: #fff;
    background: rgba(1, 17, 27, 0.1);
    width: 100%;
    height: 1000px;
    overflow: hidden;
}
.m-padded-tb-big {
    padding-top: 120px!important;
    padding-bottom: 3em!important;
}
.column{
  border-radius: 3px;
  height: 0%;
}
.container{
    width: 80%!important;
    margin-left: auto!important;
    margin-right: auto!important;
}

.view {
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
}
.text-malfunction {
    position: absolute;
    top: 50%;
    left: 51.5%;
    transform: translate(-50%,-50%) scale(2.5);
    width: 220px;
    font-size: 34px;
    font-family: sans-serif;
    color: white;
}
</style>