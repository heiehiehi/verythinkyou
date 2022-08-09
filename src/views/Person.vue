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
                <div class="ui feed column" style="background: white;padding: 8px;margin-right: -12px;margin-top: 0px">
                  <div class="event">
                    <div class="label">
                      <img src="/images/avatar/small/elliot.jpg">
                    </div>
                    <div class="content">
                      <div class="summary">
                        <a class="user">
                          Elliot Fu
                        </a> added you as a friend
                        <div class="date">1 小时前 </div>
                      </div>
                      <div class="meta">
                        <a class="like">
                          <i class="like icon"></i> 4 Likes
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="event">
                    <div class="label">
                      <img src="/images/avatar/small/helen.jpg">
                    </div>
                    <div class="content">
                      <div class="summary"><a>Helen Troy</a> 增加 <a>2 新的 illustrations</a> <div class="date">4 天前 </div>
                      </div>
                      <div class="extra images">
                        <a><img src="/images/wireframe/image.png"></a>
                        <a><img src="/images/wireframe/image.png"></a>
                      </div>
                      <div class="meta">
                        <a class="like">
                          <i class="like icon"></i> 1 Like
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="event">
                    <div class="label">
                      <img src="/images/avatar/small/jenny.jpg">
                    </div>
                    <div class="content">
                      <div class="summary"><a class="user"> Jenny Hess </a> 将你加为好友 <div class="date">2 天前 </div>
                      </div>
                      <div class="meta">
                        <a class="like">
                          <i class="like icon"></i> 8 Likes
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="event">
                    <div class="label">
                      <img src="/images/avatar/small/joe.jpg">
                    </div>
                    <div class="content">
                      <div class="summary">
                        <a>Joe Henderson</a> posted on his page
                        <div class="date">3 天前 </div>
                      </div>
                      <div class="extra text">
                        Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.
                      </div>
                      <div class="meta">
                        <a class="like">
                          <i class="like icon"></i> 5 Likes
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="event">
                    <div class="label">
                      <img src="/images/avatar/small/justen.jpg">
                    </div>
                    <div class="content">
                      <div class="summary"><a>Justen Kitsune</a> 上传 <a>2 张关于你的照片</a> <div class="date">4 天前 </div>
                      </div>
                      <div class="extra images">
                        <a><img src="/images/wireframe/image.png"></a>
                        <a><img src="/images/wireframe/image.png"></a>
                      </div>
                      <div class="meta">
                        <a class="like">
                          <i class="like icon"></i> 41 Likes
                        </a>
                      </div>
                    </div>
                  </div>
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
export default {
  name: 'Person',
  components: {
    BlogContext,
    PersonSimple,
    PersonIntro
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
