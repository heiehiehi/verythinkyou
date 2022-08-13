<template>
  <div class="hello">
    <div class="ui raised card">
      <a class="ui red right corner label" v-if="this.issel" @click="starteditor">
        <i class="icon" :class="{save:false === editor,close:true === editor}"></i>
      </a>
      <div class="content">
        <div class="header">自我介绍</div>
        <div class="ui divided selection list" v-if="editor" style="text-align: left">
          <a class="item">
            <div class="ui red horizontal label">id号</div>{{this.info.userinfo.id}}</a>
          <a class="item">
            <div class="ui purple horizontal label">生日</div><div class="block">
              <el-date-picker style="width: auto;padding-top: 4px"
                v-model="this.info.userinfo.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </a>
          <a class="item">
            <div class="ui blue horizontal label">创建日期</div>{{this.info.userinfo.creatdate}} </a>
          <a class="item">
            <div class="ui green label">性别</div><el-select v-model="value" placeholder="请选择" style="width: auto;padding-top: 4px">
            <el-option
              v-for="item in sexs"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select></a>
          <a class="item">
            <div class="ui yellow horizontal label">学校</div><el-input v-model="this.info.userinfo.school" placeholder="请输入内容" style="width: 100%;padding-top: 4px"></el-input></a>

          <div style="text-align: center">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="true" :src="this.info.userinfo.spacebg?this.info.userinfo.spacebg:'../../image/www.jpg'" style="margin-top:10px;width: 80%;border-radius: 6px;filter: opacity(40%)">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

        </div>
        <div class="ui divided selection list" v-if="!editor" style="text-align: left;">
          <a class="item">
            <div class="ui red horizontal label">id号</div>{{this.info.userinfo.id}}</a>
          <a class="item">
            <div class="ui purple horizontal label">生日</div>{{this.info.userinfo.birthday}} </a>
          <a class="item">
            <div class="ui blue horizontal label">创建日期</div>{{this.info.userinfo.creatdate}} </a>
          <a class="item">
            <div class="ui green label">性别</div>{{this.info.userinfo.sex}}</a>
          <a class="item">
            <div class="ui yellow horizontal label">学校</div>{{this.info.userinfo.school}}</a>
        </div>
      </div>
      <div class="extra content">
        <button class="ui circular facebook icon button">
          <i class="facebook icon"></i>
        </button>
        <button class="ui circular twitter icon button">
          <i class="twitter icon"></i>
        </button>
        <button class="ui circular linkedin icon button">
          <i class="linkedin icon"></i>
        </button>
        <button class="ui circular google plus icon button">
          <i class="google plus icon"></i>
        </button>
      </div>
      <div class="ui buttons" v-if="editor">
        <button class="ui button" @click="cancelediter">Cancel</button>
        <div class="or"></div>
        <button class="ui positive button" @click="updateandcancel">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonIntro',
  props: ['infos','issel'],
  created () {
    this.info = this.infos;
  },
  data(){
    return{
      sexs: [{
        value: '男',
      }, {
        value: '女',
      }, {
        value: '未知',
      }],
      info:null,
      value: '',
      editor:false,
      imageUrl:'',
      input:'',
      imglist:[],
      information:{
        id:1,
        birthday:20011114,
        creattime:'2022-07-22',
        sex:'女',
        school:'清华大学'
      }
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
<style lang="less" scoped>
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
