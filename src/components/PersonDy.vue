<template>
  <div class="hello">
    <div class="ui feed column" style="border-radius: 5px;background: white;padding: 8px;margin-right: -12px;margin-top: 0px">
      <h3 style="color: black;margin-bottom: 20px" v-if="dynamic.length==0">这里什么都木有哦~</h3>
      <div class="event" v-for="(i, index) in this.dynamic.slice(0, 5)">
        <div class="label">
          <img style="width: 40px;height: 40px;object-fit: cover;" :src="usermsg.userinfo.photo">
        </div>
        <div class="content">
          <div class="summary">
            <a class="user">
              {{usermsg.usermsg.username}}
            </a> 发布动态
            <div class="date" >{{i.creattime}} </div>
          </div>
          <div class="extra text">
            {{i.context}}
          </div>
          <div class="meta">
            <a class="like">
              <i class="like icon"></i> {{i.like}} Likes
            </a>
            <div class="ui label" v-if="deleted&&have">
              <a @click="deleteddy(i.id)">
                <i class="delete icon"></i> 删除
              </a>
            </div>
          </div>
        </div>
      </div>
      <el-pagination @current-change="HandleCurrentChange" :current-page="dynamics.cur" background layout="prev, pager, next" :page-size="dynamics.size" :total="dynamics.total"
                     style="text-align: center;margin:auto;margin-bottom: 10px">
      </el-pagination>
      <div v-if="deleted&&this.have" >
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

              <button style="margin-top: 10px" class="positive ui button" @click="addnewdy">保存动态</button>
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
  props: ['usermsgsandinfo','userid','isselfo'],
  created () {
    console.log(this.usermsg)
    this.getALLDy(1,5);
  },
  watch:{
    usermsgsandinfo(val){
      this.usermsg = val;
      this.name = val.usermsg.username
    },
    userid(val){
      this.userids = val;
    },
    isselfo(val){
      this.have = val;
    },
  },
  data(){
    return{
      userids:this.userid,
      usermsg:this.usermsgsandinfo,
      have:this.isselfo,
      deleted:true,
      editor:false,
      imageUrl: '',
      name:'??',
      time:'2022-07-31 12:38:19',
      context:"我真的是服了你这个老六啊",
      drawer: false,
      direction: 'rtl',
      msg:{
        textarea2:''
      },
      dynamic:[
        {
          id: 1
        },
        {
          id: 2
        },
      ],
      dynamics:{
        total:5,
        cur:1,
        size:5,
      },
      newdy:{
        userid:null,
        context:null,
      },
      textarea2:null,
    }
  },
  methods:{
    async deleteddy(id){
      let formdata = new FormData();
      formdata.append("token",this.$store.state.datas.token);
      let config = {
        'Content-Type': 'multipart/form-data'
      }
      var status = await axios.post(this.serverUrl+'/dynamicALL'+'/'+id,formdata,config).then(
        res=>{
          if (res.data.status==200){
            this.$notify({
              title: '成功',
              message: '恭喜你删除动态成功哦',
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
      this.getALLDy(1,5);
    },
    async addnewdy(){
      this.newdy.userid = this.userid;
      this.newdy.context = this.textarea2;
      var msg = this.newdy
      let formdata = new FormData();
      const json = JSON.stringify(msg);
      formdata.append("token",this.$store.state.datas.token);
      formdata.append("dynamic",new Blob([json], {type: 'application/json'}));
      let config = {
        'Content-Type': 'multipart/form-data'
      }
      var status = await axios.post(this.serverUrl+'/dynamicALL',formdata,config).then(
        res=>{
          if (res.data.status==200){
            this.$notify({
              title: '成功',
              message: '恭喜你上传动态哦',
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
      this.getALLDy(1,5);
    },
    HandleCurrentChange(index){
      this.getALLDy(index,this.dynamics.size);
    },
    async getALLDy(cur,size){
      var usermsg = await axios.get(this.serverUrl+'/dynamicALL'+'/'+this.userids+'/'+cur+'/'+size).then(
        (res) =>{
          console.log(res.data.data)
          return res.data.data;
        })
      this.dynamic = usermsg.records;
      console.log(this.dynamic)
      this.dynamics.total = usermsg.total;
      this.dynamics.cur = usermsg.current;
      this.dynamics.size = usermsg.size;
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
