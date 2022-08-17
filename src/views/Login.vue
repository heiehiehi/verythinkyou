<template>
  <div class="login">
    <div class="main">
      <div class="con">
        <div class="m-padded-tb-big"></div>
        <div class="ui container">

          <div class="ui internally grid">
            <div class="ui raised column" style="margin: 0 10%;width: 80%;">
              <div class="ui placeholder segment">
                <div class="ui two column very relaxed stackable grid">
                  <div class="column">
                    <div class="ui form">
                      <div class="field">
                        <label>PhoneNumber</label>
                        <div class="ui left icon input">
                          <input type="text" placeholder="Username" v-model="user.phone">
                          <i class="user icon"></i>
                        </div>
                      </div>
                      <div class="field">
                        <label>Password</label>
                        <div class="ui left icon input">
                          <input type="password" v-model="user.password">
                          <i class="lock icon"></i>
                        </div>
                      </div>
                      <div class="ui submit button" :class="{grey:(!(user.phone&&user.password)),blue:(user.phone&&user.password)}" @click="login">Login</div>
                    </div>
                  </div>
                  <div class="middle aligned column">
                    <div class="ui big button">
                      <i class="signup icon"></i>
                      Sign Up
                    </div>
                  </div>
                </div>
                <div class="ui vertical divider">
                  Or
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="background" style="display: block; width: 100%;height: 1200px;">
          <img class="allimages" src="../../image/loginbg.jpg"></img>
        </div>
      </div>




    </div>

  </div>
</template>

<script>
export default {
  name: 'PersonSimple',
  props: {
    msg: String
  },
  data(){
    return{
      editor:false,
      imageUrl: '',
      user:{
        phone:'',
        password:'',
      },
      newblog:{
        userid:'',
        title:'',
        context:'',
      },

    }
  },
  methods:{
    async Keepandcancel(){
      console.log("???sss")
      this.newblog.title = '欢迎使用这个博客系统哦~~';
      this.newblog.context = '诶嘿~~';
      this.newblog.userid = this.$store.state.datas.user.id;

      var msg = this.newblog
      let formdata = new FormData();
      formdata.append("token",this.$store.state.datas.token);
      const json = JSON.stringify(msg);
      formdata.append("blog",new Blob([json], {type: 'application/json'}));
      let config = {
        'Content-Type': 'multipart/form-data'
      }

      var status = await axios.post(this.serverUrl+'/blog'+'/'+msg.userid+'/'+msg.userid+'/'+msg.userid,formdata,config).then(
        res=>{
          if (res.data.status==200){
            this.$notify({
              title: '成功',
              message: '恭喜你创建新博客哦',
              type: 'success'
            });
          }
          else if (res.data.status==401){
            this.$notify.error({
              title: '错误',
              message: 'token错误请重新登录哦',
              type: 'error'
            });
            this.$router.replace("/")
            this.$store.dispatch('Deleteddata')
          }
          return res.data.status;
        }
      )
    },
    async getSingleAllBlog(cur,size,first){
      var usermsg = await axios.get(this.serverUrl+'/Blogsimple'+'/'+this.$store.state.datas.user.id+'/'+cur+'/'+size).then(
        (res) =>{
          console.log(res.data.data)
          return res.data.data;
        })
      if (usermsg==null||usermsg.total==0){
        console.log('okk')
        this.Keepandcancel();
      }
    },
    async login(){
      if (this.user.password&&this.user.phone){
        this.user.password = this.$md5(this.user.password);
        var msg = await axios.post(this.serverUrl+'/UserSign',this.user).then(
          res =>{
            console.log(res)
            if (res.data.status==200){
              this.$notify({
                title: '成功',
                message: '恭喜你成功登录哦',
                type: 'success'
              });
              return res.data.data;
            }
            else {
              this.$notify.error({
                title: '错误',
                message: '密码或者账号错误请重新登录哦',
                type: 'error'
              });
            }
          }
        )
        var photo = await axios.get(this.serverUrl+'/Userdetial'+'/'+msg.user.id).then(
          res =>{
            return res.data.data.photo;
          }
        )
        msg.user.photo = photo;
        this.$store.commit('Keepdata',msg);

        this.getSingleAllBlog(1,5,true);

        this.$router.replace("/")
      }
      else {
        this.$notify.error({
          title: '电话号或者密码没填写完整~',
          message: '请好好输入信息哦'
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.con {
  position: relative;
  color: #fff;
  background: rgba(1, 17, 27, 0.1);
  width: 100%;
  height: 1200px;
  overflow: hidden;
}
.allimages{
  width: 100%;
}
.background {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(2px);
  transform: scale(1.2);
}
.m-padded-tb-big {
    padding-top: 160px!important;
    padding-bottom: 3em!important;
}

.column {
  border-radius: 3px;
  height: 0%;
}

.container{
    width: 80%!important;
    margin-left: auto!important;
    margin-right: auto!important;
}
</style>
