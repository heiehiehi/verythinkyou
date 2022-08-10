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
                    <input type="text" name="first-name" placeholder="Name">
                  </div>
                  <div class="field">
                    <label>电子邮箱</label>
                    <input type="email" placeholder="joe@schmoe.com">
                  </div>
                  <div class="field">
                    <label>手机号</label>
                    <input type="text" name="Phonenumber" placeholder="Phonenumber">
                  </div>
                  <div class="field">
                    <label>密码</label>
                    <input type="password" name="Password" placeholder="Password">
                  </div>
                  <div class="field">
                    <label>再次确认密码</label>
                    <input type="password">
                  </div>
                  <button class="ui button" type="submit">Submit</button>
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
  props: {
    msg: String
  },
  data(){
    return{
      editor:false,
      imageUrl: ''
    }
  },
  methods:{
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

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      return isJPG && isLt2M;
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
