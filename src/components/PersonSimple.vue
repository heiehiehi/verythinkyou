<template>
  <div class="hello">
    <div class="ui special cards">
      <div class="card">
        <a class="ui red right corner label" @click="starteditor">
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
            class="avatar-uploader"
            v-if="editor"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="true" src="../../image/www.jpg" style="margin-bottom:-5px;width: 100%;border-radius: 6px;filter: opacity(40%)">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <img v-if="!editor" src="../../image/www.jpg">
        </div>
        <div class="content">
          <a class="header">笨蛋小刘</a>
          <div class="meta">
            <span class="date">Created in Sep 2022</span>
          </div>
          <div class="ui form" v-if="editor">
            <div class="field" style="text-align: left">
              <label>自我介绍</label>
              <textarea rows="2">笨蛋小刘是一只居住在赣州的大憨猪，她喜爱小猫、音乐和派对。 </textarea>
            </div>
          </div>
          <div class="description" v-if="!editor">笨蛋小刘是一只居住在赣州的大憨猪，她喜爱小猫、音乐和派对。 </div>
        </div>
        <div class="extra content">
          <a>
            <i class="book icon"></i>
            2 篇
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
