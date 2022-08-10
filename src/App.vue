<template>
  <div id="app">
    <div class="site">
      <div class="ui gery inverted fixed secondary stackable menu" style="background: rgba(102,204,255,0.3)">
        <!-- <div class="ui container"> -->
        <div class="ui container">
          <div class="item">
            <img src="../image/Logo.png">
          </div>
          <a class="item" :class="{active: isActive === 1}" @click="changerouter('/','#shouye',1)">
              首页
            </a>

          <a class="item" :class="{active: isActive === 2}" @click="changerouter('/','#blog',2)">
            博客
          </a>
          <a class="item" :class="{active: isActive === 3}" @click="changerouter('/','#youlian',3)">友链 </a>
          <a class="item" :class="{active: isActive === 4}" @click="changerouter('/','#about',4)">关于我们 </a>
          <!-- <a class="item" :class="{active: isActive === 6}" @click="changerouter('/','#aboutus',6)">???</a> -->
          <div class="right menu" v-if="!login">
            <a class="item" :class="{active: isActive === 5}" @click="changerouter('/login','#shouye',5)">
            登录
            </a>
          </div>
          <div class="right menu" v-if="login">
            <el-dropdown style="margin:0 auto;display: inline-block">
              <div class="item label" >
                <a  type="primary"><img class="ui mini avatar image" src="../image/www.jpg"></a>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div @click="intoPersonCenter">个人中心</div></el-dropdown-item>
                <el-dropdown-item v-if="msg.pro===2"><div @click="IntoSignin">注册账号</div></el-dropdown-item>
                <el-dropdown-item><div @click="exit">退出</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div>
        <div id="nav">
          <!-- <router-link to="/"></router-link> -->
        </div>
        <router-view></router-view>
      </div>
      <div class="end" id="aboutus"></div>
    </div>
  </div>

</template>


<script>
export default {
  data () {
    return {
      token:'',
      login:true,

      isActive:1,
      msg:{
        id: null,
    	  phone: "8737578",
    	  username: "k4sdask",
    	  email: "8sdasdassd@qq.com",
    	  password: "XingHui",
    	  pro: 2,
    	  hide: 0
      },
      information:{
        birthday: 20011114,
        introduction:'我是自我介绍2333333',
        photo:'http://localhost:80/Information/photo/zhansan.jpg',
        creatdate:"2022-07-22 17:13:44",
        sex:2,
        school:'清华大学',
        blog:'3',
        spacebg:'http://localhost:80/Information/Spacebackground/zhansanSpaceBackground.jpg'
      }
    }
  },
  methods: {
    IntoSignin(){
      this.$router.replace("/signin")
    },
    intoPersonCenter(){
      this.$router.replace("/person")
    },
    exit(){
      this.login = false;
      this.token = null;
      this.$router.replace("/")
    },
    anchorPoint(idName){
        document.querySelector(idName).scrollIntoView(true);
     },
    changeClass(i) {
      this.isActive = i;
    },
    changerouter(name,loc,id){
      this.$router.replace(name).catch(err => err);
      if(this.isActive==5){
        this.isActive=1;
      }
      console.log(this.isActive);
      this.changeloc(loc,id)
    },
    changeloc(loc,id){
      this.anchorPoint(loc);
      this.changeClass(id);
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
.allimages{
  width: 100%;
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
}.clicka {
  line-height: 30px;

  text-decoration: none;

  display: block;

  /*跟随父元素的高度*/

  height: inherit;
}
</style>
