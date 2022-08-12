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
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="true" :src="this.simples.userinfo.photo" style="margin-bottom:-5px;width: 100%;object-fit: cover;;border-radius: 6px;filter: opacity(40%)">
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
              <textarea rows="2"></textarea>
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
  },
  data(){
    return{
      editor:false,
      imageUrl: '',
      datas:null,
      simples:null,
      isselfs:false,
    }
  },
  watch:{
    photoList: function (newData) {
      this.datas = newData
      this.kkknd(this.datas)
    }
  },
  methods:{
    kkknd(){
      console.log(this.datas)
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
