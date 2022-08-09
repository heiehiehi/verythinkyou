<template>
  <div class="home">
    <header style="height: 747px">
      <div class="text-malfunction">
        <h2 class="ui grey inverted header" style="text-align: center;">
          <div class="content">
            Welcome to the star strewn sky
            <div class="sub header">下滑可发现更多精彩内容</div>
          </div>
        </h2>
      </div>
      <div class="background" id="shouye">
        <img class="allimages" src="../../image/test2.jpg" style="display: block; width: 100%;"></img>
      </div>

    </header>
    <div class="main">
      <div class="con" id="blog">
        <div class="m-padded-tb-big">
          <div class="ui container">
            <div class="ui fixed stackable grid">
              <div class="five wide column" style="background: white;">
                <h3 class="ui header" style="margin-top: 5px;">博客用户</h3>
                <div class="ui placeholder" @click="PersonCenter()" v-for="count in 3" style="margin-left:10px;cursor: pointer;">
                  <div class="image header">
                    <div class="line">我草草草</div>
                    <div class="line"></div>
                  </div>
                  <div class="paragraph">
                    <div class="medium line"></div>
                    <div class="short line"></div>
                  </div>
                </div>
                <el-pagination background layout="prev, pager, next" :total="20"
                  style="text-align: center;margin-top: 20px;">
                </el-pagination>
              </div>
              <div class="ten wide column" style="background-color: white; text-align: left;margin-left: 5%;">
                <h3 class="ui header" style="text-align: center;margin-top: 5px;">博客文章</h3>
                <div class="ui items">
                  <div class="item" v-for="count in 5" style="margin-left:10px">
                    <div class="image">
                      <img src="/images/wireframe/image.png">
                    </div>
                    <div class="content">
                      <a class="header">标题</a>
                      <div class="meta">
                        <span>Description</span>
                      </div>
                      <div class="description">
                        <p></p>
                      </div>
                      <div class="extra">
                        Additional Details
                      </div>
                    </div>
                  </div>
                  <el-pagination background layout="prev, pager, next" :total="1000"
                    style="text-align: center;margin-top: 20px;">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="background" style="display: block; width: 100%;height: 1200px;">
          <img class="allimages" src="../../image/bg2.jpg"></img>
        </div>
      </div>

      <div class="con" id="youlian">
        <div class="m-padded-tb-big">
          <div class="ui container">
            <div class="column" style="background-color: white;padding: 30px;text-align: center;">
              <h3 class="ui header" style="margin-top: 5px;">友情链接</h3>
              <div class="ui three column grid">
                <div class="row" v-for="count in 2">
                  <div class="column" v-for="count in 3">
                    <div class="ui card" style="display:inline-block">
                      <div class="content">
                        <div class="center aligned header">Jenny Hess</div>
                        <div class="center aligned description">
                          <p>Jenny是一名在该新学校学习媒体管理的在校生。</p>
                        </div>
                      </div>
                      <div class="extra content">
                        <div class="center aligned author">
                          <img class="ui avatar image" src="https://semantic-ui.com/images/avatar/small/jenny.jpg">
                          Jenny
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <el-pagination background layout="prev, pager, next" :total="20"
                style="text-align: center;margin-top: 20px;">
              </el-pagination>
            </div>

          </div>
        </div>
        <div class="background" style="display: block; width: 100%;height: 900px;">
          <img class="allimages" src="../../image/bg3.jpg"></img>
        </div>
      </div>

      <div class="con" id="about">
        <div class="m-padded-tb-big">
          <div class="ui container">
            <div class="ui internally grid">
              <div class="ui raised column" style="background: white;margin: 0 10%;width: 80%;">

                <h3 class="ui header" style="margin: 10px;">关于我们</h3>
                <p style="color:black;margin: 20px;">
                  豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。

                  时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿；临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。

                  披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。

                  遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会于云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人？萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？

                  嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！

                  勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？

                  呜乎！胜地不常，盛筵难再；兰亭已矣，梓泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔：

                  滕王高阁临江渚，佩玉鸣鸾罢歌舞。

                  画栋朝飞南浦云，珠帘暮卷西山雨。

                  闲云潭影日悠悠，物换星移几度秋。

                  阁中帝子今何在？槛外长江空自流。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="background" style="display: block; width: 100%;height: 900px;">
          <img class="allimages" src="../../image/bg4.jpg"></img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: 1,
      msg: {
        id: null,
        phone: "8737578",
        username: "k4sdask",
        email: "8sdasdassd@qq.com",
        password: "XingHui",
        pro: 2,
        hide: 0
      }
    }
  },
  methods: {
    PersonCenter(){
      this.$router.replace("/person").catch(err => err);
    },
    changeClass(i) {
      this.isActive = i;
    },
    getMsg: function () {
      var user = 4;
      let formdata = new FormData();
      const json = JSON.stringify(this.msg);
      formdata.append("user", new Blob([json], { type: 'application/json' }));

      formdata.append("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NzM3NTc4IiwiaWF0IjoxNjU5NDMzODk4LCJleHAiOjE2NTk1MjAyOTh9.Tikn-XdDyTWRXzBtYTqksjeFDNC_V-N5SagDkLpMA6s");

      let config = {
        'Content-Type': 'multipart/form-data'
      }
      axios.post("http://localhost:80/Userregister", formdata, config).then(
        res => {
          console.log(res);
          this.msg.name = res.data.data.name;
          console.log(res.data.data.name);
          this.msg.age = res.data.data.age;
          console.log(res.data.data.age);
        }
      )
    },
    SaveMsg: function () {
      axios.get(this.serverUrl + "/UserSign", JSON.stringify(this.msg))
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err);
        })
      console.log("发送成功")
    }
  }
}
</script>



<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

header {
  position: relative;
  color: #fff;
  background: rgba(1, 17, 27, 0.5);
  width: 100%;
  height: auto;
  overflow: hidden;
}
.allimages{
  width: 100%;
}

.background {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  z-index: -1;
  filter: blur(4px);
  transform: scale(1.2);
}

.end {
  position: relative;
  color: rgb(43, 43, 43);
  background: rgba(83, 83, 83, 0.8);
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.con {
  position: relative;
  color: #fff;
  background: rgba(1, 17, 27, 0.1);
  width: 100%;
  height: 870px;
  overflow: hidden;
}

.m-padded-tb-big {
  padding-top: 120px !important;
  padding-bottom: 3em !important;
}

.column {
  border-radius: 3px;
  height: 0%;
}

.container {
  width: 80% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.view {
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
}

.text-malfunction {
  position: absolute;
  top: 50%;
  left: 51.5%;
  transform: translate(-50%, -50%) scale(2.5);
  width: 220px;
  font-size: 34px;
  font-family: sans-serif;
  color: white;
}
</style>

