<template>
  <div class="person">
    <div class="main" style="margin-bottom: 100px">
      <div class="con">
        <div class="m-padded-tb-big"></div>
        <div class="ui container">
          <div class="ui grid" style="text-align: center;">
            <div class="row">
              <div class="three wide column">
                <div>
                  <person-simple :simple="this.item" :isself="this.self"></person-simple>
                </div>
              </div>
              <div class="thirteen wide column">
                <div class="ui three column divided grid special cards" style="background-color: white;text-align: center;margin-top: 0px">
                  <h3 class="ui header" style="margin: 10px auto">个人博客</h3>
                  <div class="row">
                    <div class="column" v-for="(i, index) in this.blogs.records.slice(0, 3)">
                      <div class="ui card" style="margin:0px auto">
                        <div class="content" style="text-align: left" >
                          <div class="right floated meta" style="margin-top: 3px">{{i.lastdate}}</div>
                          <img class="ui avatar image" :src="item.userinfo.photo" style="object-fit: cover;"><span style="color: #8a8a8a;">{{item.usermsg.username}}</span>
                        </div>
                        <div class="ui medium image">
                          <img :src="i.background" style="width: 100%;height: 150px;object-fit: cover;">
                        </div>
                        <div class="extra content">
                          <div class="ui divided selection list" style="text-align: left">
                            <a class="item" @click="intoNewBlog(i.id)">
                              <div class="ui blue label">Title</div>
                              {{i.title}}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column" v-for="(i, index) in this.blogs.records.slice(3, 6)">
                      <div class="ui card" style="margin:0px auto">
                        <div class="content" style="text-align: left" >
                          <div class="right floated meta" style="margin-top: 3px">{{i.lastdate}}</div>
                          <img class="ui avatar image" :src="item.userinfo.photo" style="object-fit: cover;"><span style="color: #8a8a8a;">{{item.usermsg.username}}</span>
                        </div>
                        <div class="ui medium image">
                          <img :src="i.background?i.background:item.userinfo.spacebg" style="width: 100%;height: 150px;object-fit: cover;">
                        </div>
                        <div class="extra content">
                          <div class="ui divided selection list" style="text-align: left">
                            <a class="item" @click="intoNewBlog(i.id)">
                              <div class="ui blue label">Title</div>
                              {{i.title}}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <el-pagination @current-change="HandleCurrentChange" :current-page="this.Blogtotal.cur" background layout="prev, pager, next" :page-size="Blogtotal.size" :total="Blogtotal.total"
                                 style="text-align: center;margin:auto;margin-bottom: 10px">
                  </el-pagination>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="three wide column">
                <div>
                  <person-intro :infos="this.item" :issel="this.self"></person-intro>
                </div>

              </div>
              <div class="ten wide column" style="background-color: white;text-align: center;margin-top: 0px">
                <blog-context :infomations="this.showblog" :have="(this.have)&&this.self"></blog-context>
              </div>
              <div class="three wide column">
                <div>
                  <PersonDy :usermsgsandinfo="this.item" :userid="this.id" :isselfo="(this.have)&&this.self"></PersonDy>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="background">
          <img class="allimages" src="../../image/bg5.jpg"></img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogContext from '@/components/BlogContext.vue'
import PersonSimple from '@/components/PersonSimple.vue'
import PersonIntro from '@/components/PersonIntro.vue'
import PersonDy from '@/components/PersonDy.vue'
export default {
  name: 'Person',
  components: {
    BlogContext,
    PersonSimple,
    PersonIntro,
    PersonDy
  },
  data(){
    return{
      id:null,
      item:{
        usermsg:null,
        userinfo:null,
      },
      self:false,
      blogs:null,
      Blogtotal:{
        total:1,
        cur:1,
        size:5,
      },
      showblog:null,
      have:true,
    }
  },
  beforeCreate() {
    // console.log(this.item);
  },
  created () {
    this.id = JSON.parse(this.$route.query.data);
    if (this.id!=this.$store.state.datas.user.id){
      this.self = false;
    }
    else {
      this.self = true;
    }
    this.GetAllinfromation()

    if (this.$route.query.showid!=null){
      this.getSingleDetBlog(this.$route.query.showid);
      this.getSingleAllBlog(1,6,false);
    }
    else {
      this.getSingleAllBlog(1,6,true);
    }


  },
  methods: {
    intoNewBlog(index){
      this.getSingleDetBlog(index);
    },
    HandleCurrentChange(index){
      this.getSingleAllBlog(index,this.blogs.size,false);
      console.log(index)
    },
    async getSingleDetBlog(id){
      var usermsg = await axios.get(this.serverUrl+'/blog'+'/'+id).then(
        (res) =>{
          return res.data;
        })
      this.showblog = usermsg.data;
    },
    async getSingleAllBlog(cur,size,first){
      var usermsg = await axios.get(this.serverUrl+'/Blogsimple'+'/'+this.id+'/'+cur+'/'+size).then(
        (res) =>{
          console.log(res.data.data)
          return res.data.data;
        })
      this.blogs = usermsg;
      this.Blogtotal.total = usermsg.total;
      this.Blogtotal.cur = usermsg.current;
      this.Blogtotal.size = usermsg.size;

      if (first){
        if (this.blogs.records.length>0){
          this.getSingleDetBlog(this.blogs.records[0].id);
        }
        else if(this.id==this.$store.state.datas.user.id){
          this.have = true;
        }
        else {
          this.have = false;
        }
      }
    },
    getInformation(){
      console.log(this.item);
    },
    async GetAllinfromation(){
      var usermsg = await axios.get(this.serverUrl+'/Userregister'+'/'+this.id).then(
        (res) =>{
          return res.data.data;
        })
      var userinfo = await axios.get(this.serverUrl+'/Userdetial'+'/'+this.id).then(
        (res) =>{
          return res.data.data;
        })
      if (userinfo.sex == 1){
        userinfo.sex = '男';
      }
      else if (userinfo.sex == 2){
        userinfo.sex = '女';
      }
      else if (userinfo.sex == 0){
        userinfo.sex = '未知';
      }
      this.item.usermsg = usermsg;
      this.item.userinfo = userinfo;
    }
  },

}
</script>
<style lang="less" scoped>
.allimages{
  width: 100%;
}
.con {
  position: relative;
  color: #fff;
  background: rgba(1, 17, 27, 0.1);
  width: 100%;
  height: auto;
  overflow: hidden;
}

.container {
  width: 95% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.background {
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: -1;
  filter: blur(2px);
  transform: scale(1.2);
}

.m-padded-tb-big {
  padding-top: 80px !important;
  padding-bottom: 3em !important;
}

.column {
  border-radius: 5px;
  box-shadow: #0f0f10;
}
</style>
