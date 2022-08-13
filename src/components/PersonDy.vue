<template>
  <div class="hello">
    <div class="ui feed column" style="border-radius: 5px;background: white;padding: 8px;margin-right: -12px;margin-top: 0px">
      <div class="event" v-for="count in 5">
        <div class="label">
          <img src="../../image/www.jpg">
        </div>
        <div class="content">
          <div class="summary">
            <a class="user">
              {{name}}
            </a> 发布动态
            <div class="date" >{{time}} </div>
          </div>
          <div class="extra text">
            {{context}}
          </div>
          <div class="meta">
            <a class="like">
              <i class="like icon"></i> 4 Likes
            </a>
            <div class="ui label" v-if="deleted">
              <a>
                <i class="delete icon"></i> 删除
              </a>
            </div>
          </div>
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" :total="20"
                     style="text-align: center;margin:auto;margin-bottom: 10px">
      </el-pagination>
      <div v-if="deleted">
        <el-radio-group v-model="direction">
        </el-radio-group>
        <button @click="drawer = true" style="margin-left: 16px;" class="ui purple button">戳我写新动态哦~~</button>


        <el-drawer
          title="发布你的新动态哦~"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
          <span>
            <div>
              <el-input
                type="textarea"
                :autosize="{minRows: 10, maxRows: 20}"
                placeholder="请输入内容"
                v-model="textarea2">
              </el-input>

              <button style="margin-top: 10px" class="positive ui button">保存动态</button>
            </div>
          </span>
        </el-drawer>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'PersonDy',
  props: {
    msg: String
  },
  data(){
    return{
      deleted:true,
      editor:false,
      imageUrl: '',
      name:'笨蛋小刘',
      time:'2022-07-31 12:38:19',
      context:"我真的是服了你这个老六啊",
      drawer: false,
      direction: 'rtl',
      msg:{
        textarea2:''
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
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
