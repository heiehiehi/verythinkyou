<template>
  <div class="login">
    <div class="main">
      <div class="con">
        <div class="m-padded-tb-big"></div>
        <div class="ui container">

          <div class="ui internally grid">
            <div class="ui raised column" style="margin: 0 10%;width: 80%;">
              <div class="ui placeholder segment">
                <h3 style="color: black">好好填写信息喵~~QWQ</h3>
                <form class="ui form">
                  <div class="field">
                    <label>Name</label>
                    <input type="text" name="first-name" placeholder="Name" v-model="username">
                  </div>
                  <div class="field">
                    <label>电子邮箱</label>
                    <input type="email" placeholder="joe@schmoe.com" v-model="email">
                  </div>
                  <div class="field">
                    <label>手机号</label>
                    <input type="text" name="Phonenumber" placeholder="Phonenumber" v-model="phone">
                  </div>
                  <div class="field">
                    <label>密码</label>
                    <input type="password" name="Password" placeholder="Password" v-model="password1">
                  </div>
                  <div class="field">
                    <label>再次确认密码</label>
                    <input type="password" v-model="password2">
                  </div>
                  <div class="field">
                    <label>权限等级</label>
                    <input type="text" placeholder="1为普通权限，2为最高权限" v-model="pro">
                  </div>
                  <div class="field">
                    <label>隐藏</label>
                    <input type="text" placeholder="0为不隐藏，1为隐藏" v-model="hide">
                  </div>
                  <h4 style="color: black">请上传新账号的头像</h4>
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    style="width: 300px;height: 250px;margin: 0 auto"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="true" :src="photo" style="margin-bottom:-5px;width: 100%;object-fit: cover;border-radius: 6px;filter: opacity(40%)">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <button class="ui button" type="submit" @click="Sumbitmsg">Submit</button>
                </form>
              </div>

            </div>
          </div>
        </div>
        <div class="background" style="display: block; width: 100%;height: 1200px;">
          <img class="allimages" src="../../image/bg6.jpg"></img>
        </div>
      </div>




    </div>

  </div>
</template>

<script>
export default {
  name: 'Signin',
  props: {},
  data(){
    return{
      editor:false,
      imageUrl: '',
      fileList:null,
      photo:'../../image/bg6.jpg',
      password1:'',
      password2:'',
      msg:{
        phone:'',
        username:'',
        email:'',
        password:'',
        pro:'',
        hide:'',
      },
      newblog:{
        userid:'',
        title:'',
        context:'',
      },
      username:'',
      phone:'',
      email:'',
      pro:'',
      hide:'',
    }
  },
  methods:{
    async update(){
      let formdata = new FormData();
      formdata.append("file",this.fileList);
      formdata.append("token",this.$store.state.datas.token);
      var msgs = this.msg;
      const json = JSON.stringify(msgs);
      formdata.append("user",new Blob([json], {type: 'application/json'}));
      let config = {
        'Content-Type': 'multipart/form-data'
      }
      var status = await axios.post(this.serverUrl+'/Userregister',formdata,config).then(
        res=>{
          if (res.data.status==200){
            this.$notify({
              title: '成功',
              message: '恭喜你注册账号成功哦',
              type: 'success'
            });
          }
          return res.data.status;
        }
      )

      if (status == 401){
        this.$notify.error({
          title: '错误',
          message: 'token错误请重新登录哦',
          type: 'error'
        });
        this.$router.replace("/")
        this.$store.dispatch('Deleteddata')
      }
    },
    async Sumbitmsg(){
      if (this.username&&this.hide&&this.phone&&this.email&&this.pro){
        if (this.password1!=this.password2){
          this.$notify.error({
            title: '错误',
            message: '密码不一致请重新填写哦',
            type: 'error'
          });
        }
        else if (this.fileList==null){
          this.$notify.error({
            title: '错误',
            message: '文件不存在请重新上传哦',
            type: 'error'
          });
        }
        else {
          console.log(this.$md5(this.password1))
          this.msg.password = this.$md5(this.password1);
          this.msg.email = this.email;
          this.msg.username = this.username;
          this.msg.phone = this.phone;
          this.msg.pro = this.pro;
          if (this.hide==0){
            this.msg.hide = false;
          }
          else {
            this.msg.hide = true;
          }
          this.update();
        }
      }
      else {
        this.$notify.error({
          title: '错误',
          message: '信息未填写完全请重新填写哦',
          type: 'error'
        });
      }



      // if (this.email==''){
      //   this.$notify.error({
      //     title: '错误',
      //     message: '邮箱不存在请重新填写哦',
      //     type: 'error'
      //   });
      //   return;
      // }
      // else {
      //   this.msg.email = this.email;
      // }
      //
      // if (this.phone==''){
      //   this.$notify.error({
      //     title: '错误',
      //     message: '电话不存在请重新填写哦',
      //     type: 'error'
      //   });
      //   return;
      // }
      // else {
      //   this.msg.phone = this.phone;
      // }
      //
      // if (this.pro==''){
      //   this.$notify.error({
      //     title: '错误',
      //     message: '权限不存在请重新填写哦',
      //     type: 'error'
      //   });
      //   return;
      // }
      // else {
      //   this.msg.pro = this.pro;
      // }
      //
      // if (this.hide==''){
      //   this.$notify.error({
      //     title: '错误',
      //     message: '隐藏不存在请重新填写哦',
      //     type: 'error'
      //   });
      //   return;
      // }
      // else {
      //   this.msg.hide = this.hide;
      // }
      //
      // if (this.fileList==''){
      //   this.$notify.error({
      //     title: '错误',
      //     message: '不存在文件请重新上传哦',
      //     type: 'error'
      //   });
      //   return;
      // }


    },
    updateandcancel(){
      this.editor = false;
    },
    cancelediter(){
      this.editor = false;
    },
    starteditor(){
      this.editor = !this.editor;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      this.fileList=file
      // console.log(file)
      // console.log(this.submit.photo);
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      this.photo = URL.createObjectURL(file);
      return isJPG && isLt2M;
    }
  }
}
</script>

<style lang="less" scoped>
.img-divs {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  img{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
}
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
