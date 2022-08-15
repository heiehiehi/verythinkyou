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
                v-model="information.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </a>
          <a class="item">
            <div class="ui blue horizontal label">创建日期</div>{{this.info.userinfo.creatdate}} </a>
          <a class="item">
            <div class="ui green label">性别</div><el-select v-model="information.sex" placeholder="请选择" style="width: auto;padding-top: 4px">
            <el-option
              v-for="item in sexs"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select></a>
          <a class="item">
            <div class="ui yellow horizontal label">学校</div><el-input v-model="information.school" placeholder="请输入内容" style="width: 100%;padding-top: 4px"></el-input></a>

          <div style="text-align: center">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="true" :src="photo?photo:'../../image/www.jpg'" style="margin-top:10px;width: 80%;border-radius: 6px;filter: opacity(40%)">
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
    this.information.id = this.info.usermsg.id;
    this.information.birthday = this.info.userinfo.birthday;
    this.information.school = this.info.userinfo.school;
    this.information.sex = this.info.userinfo.sex;
    this.photo = this.info.userinfo.spacebg;
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
        birthday:'',
        creattime:'2022-07-22',
        sex:'',
        school:'',
      },
      photo:null,
      fileList:null,
    }
  },
  methods:{
    checkTime(i) {//时间
      if (i < 10) {
        i = "0" + i
      }
      return i;
    },
    checkTime2(i){
      if (i<10){
        return '0'+i;
      }
      return i;
    },
    async updateandcancel(){
      this.editor = false;
      if ((typeof this.information.birthday)!='string'){
        var date_value = this.information.birthday.getFullYear() + '-' + this.checkTime2(this.information.birthday.getMonth() + 1) + '-' + this.information.birthday.getDate()
          + ' ' + this.checkTime(this.information.birthday.getHours()) + ':' + this.checkTime(this.information.birthday.getMinutes()) + ':' + this.checkTime(this.information.birthday.getSeconds());
        console.log(typeof this.information.birthday)
        this.information.birthday = date_value
      }
      // var date = this.information.birthday.getFullYear()+'-'+(this.information.birthday.getMonth()+1);
      // console.log(typeof this.information.birthday)

      let formdata = new FormData();
      formdata.append("token",this.$store.state.datas.token);
      var msg = this.information;
      if (msg.sex=='男'){
        msg.sex = 1;
      }
      else if (msg.sex=='女'){
        msg.sex = 2;
      }
      else {
        msg.sex = 0;
      }
      const json = JSON.stringify(msg);
      formdata.append("information",new Blob([json], {type: 'application/json'}));
      let config = {
        'Content-Type': 'multipart/form-data'
      }

      if (this.fileList!=null){
        formdata.append('file',this.fileList)
        var status = await axios.post(this.serverUrl+'/Userbg',formdata,config).then(
          res=>{
            return res.data.status
          }
        )
        if (status == 200){
          this.$notify({
            title: '成功',
            message: '恭喜你上传背景成功哦',
            type: 'success'
          });
          this.fileList = null;
          this.info.userinfo.spacebg = this.photo;
        }

      }

      axios.post(this.serverUrl+'/Userdetial'+'/'+msg.id,formdata,config).then(
        res=>{
          if (res.data.status==200){
            this.$notify({
              title: '成功',
              message: '恭喜你更新信息成功哦',
              type: 'success'
            });
          }
        }
      )
      this.info.usermsg.id = this.information.id;
      this.info.userinfo.birthday =  this.information.birthday;
      this.info.userinfo.school = this.information.school;
      if (this.information.sex == 1){
        this.info.userinfo.sex = '男'
      }
      else if (this.information.sex == 2){
        this.info.userinfo.sex = '女'
      }
      else if (this.information.sex == 0){
        this.info.userinfo.sex = '未知'
      }
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
      console.log(file)
      console.log(this.fileList);
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      this.photo = URL.createObjectURL(file);
      console.log(this.photo);
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
