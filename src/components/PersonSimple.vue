<template>
  <div class="hello">
    <div class="ui special cards">
      <div class="card">
        <a class="ui red right corner label" v-if="isself" @click="starteditor">
          <i class="icon" :class="{save:false === editor,close:true === editor}"></i>
        </a>
        <div class="blurring dimmable image">
          <div class="ui dimmer">
            <div class="content">
              <div class="center">
                <div class="ui inverted button">添加好友</div>
              </div>
            </div>
          </div>
          <el-upload
            class="avatar-uploader img-divs"
            v-if="editor"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="true" :src="this.submit.photo" style="margin-bottom:-5px;width: 100%;object-fit: cover;border-radius: 6px;filter: opacity(40%)">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="img-divs" v-if="!editor">
            <img style="object-fit: cover;" :src="this.simples.userinfo.photo">
          </div>
        </div>
        <div class="content">
          <a class="header">{{this.simples.usermsg.username}}</a>
          <div class="meta">
            <span class="date">创建时间: {{this.simples.userinfo.creatdate}}</span>
          </div>
          <div class="ui form" v-if="editor">
            <div class="field" style="text-align: left">
              <label>自我介绍</label>
              <textarea rows="2" v-model="introduction"></textarea>
            </div>
          </div>
          <div class="description" v-if="!editor">{{this.simples.userinfo.introduction}}</div>
        </div>
        <div class="extra content">
          <a>
            <i class="book icon"></i>
            {{this.simples.userinfo.blog}} 篇
          </a>
        </div>
        <div class="ui buttons" v-if="editor">
          <button class="ui button" @click="cancelediter">Cancel</button>
          <div class="or"></div>
          <button class="ui positive button" @click="updateandcancel">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonSimple',
  props: ['simple','isself'],
  created(){
    // console.log(props.simple)
    // console.log('aaaaa')
    this.simples = this.simple
    this.isselfs = this.isself
    this.submit.photo = this.simples.userinfo.photo
    this.submit.introduction = this.simples.userinfo.introduction
    this.submit.id = this.simples.userinfo.id
    console.log('aaaaa')
    console.log(this.simples)
  },
  data(){
    return{
      editor:false,
      imageUrl: '',
      datas:null,
      simples:null,
      isselfs:false,
      introduction:null,
      submit:{
        id:null,
        introduction:'',
        photo:'',
      },
      fileList: null,
    }
  },
  watch:{
    photoList: function (newData) {
      this.datas = newData
    }
  },
  methods:{
    uploadFile(){
      console.log("这里是上传")
    },
    kkknd(){
      console.log(this.datas)
    },
    async updateandcancel(){
      this.editor = false;
      let formdata = new FormData();
      formdata.append("file",this.fileList);
      formdata.append("token",this.$store.state.datas.token);
      var msg = this.submit;
      msg.introduction = this.introduction
      msg.photo = this.simples.userinfo.photo
      const json = JSON.stringify(msg);
      formdata.append("information",new Blob([json], {type: 'application/json'}));
      let config = {
        'Content-Type': 'multipart/form-data'
      }
      var status = await axios.post(this.serverUrl+'/Userdetial'+'/'+msg.id,formdata,config).then(
        res=>{
          if (res.data.status==200){
            this.$notify({
              title: '成功',
              message: '恭喜你更新信息成功哦',
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

      if (this.fileList!=null){
        status = await axios.post(this.serverUrl+'/Userdetial',formdata,config).then(
          res=>{
            if (res.data.status==200){
              this.$notify({
                title: '成功',
                message: '恭喜你上传头像成功哦',
                type: 'success'
              });
              this.fileList = null;
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
        this.simples.userinfo.photo = this.submit.photo
      }
      this.simples.userinfo.introduction = this.introduction

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
      this.submit.photo = URL.createObjectURL(file);
      return isJPG && isLt2M;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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


.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
