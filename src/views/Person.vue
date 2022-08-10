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
                  <person-simple></person-simple>
                </div>
              </div>
              <div class="thirteen wide column">
                <div class="ui three column divided grid special cards" style="background-color: white;text-align: center;margin-top: 0px">
                  <h3 class="ui header" style="margin: 10px auto">个人博客</h3>
                  <div class="row" v-for="count in 2">
                    <div class="column" v-for="count in 3">
                      <div class="ui card" style="margin:0px auto">
                        <div class="content" style="text-align: left">
                          <div class="right floated meta">14h</div><img class="ui avatar image" src="../../image/bg4.png"> Elliot </div>
                        <div class="ui medium image">
                          <img src="../../image/bg4.png" style="width: 100%;height: 150px;object-fit: cover;">
                        </div>
                        <div class="extra content">
                          <div class="ui divided selection list" style="text-align: left">
                            <a class="item">
                              <div class="ui blue label">Title</div>
                              Poodle
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <el-pagination background layout="prev, pager, next" :total="20"
                                 style="text-align: center;margin:auto;margin-bottom: 10px">
                  </el-pagination>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="three wide column">
                <div>
                  <person-intro></person-intro>
                </div>

              </div>
              <div class="ten wide column" style="background-color: white;text-align: center;margin-top: 0px">
                <blog-context msg="这里是博客哦"></blog-context>
              </div>
              <div class="three wide column">
                <div>
                  <PersonDy></PersonDy>
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
  }
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
