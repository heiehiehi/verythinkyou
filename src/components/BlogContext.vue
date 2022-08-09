<template>
  <div class="hello">
    <div>
      <el-popover
        placement="top-start"
        title="Tips"
        width="200"
        trigger="hover"
        content="点击创建新博客">
        <a class="ui green left corner label" slot="reference" @click="starteditor">
          <i class="icon"  :class="{save:false === editor,close:true === editor}"></i>
        </a>
      </el-popover>
      <a class="ui red right corner label" @click="starteditor">
        <i class="icon" :class="{save:false === editor,close:true === editor}"></i>
      </a>
      <h1 v-if="!editor">{{ msg }}</h1>
      <el-input
        v-if="editor"
        style="width: 60%"
        type="textarea"
        autosize
        placeholder="请输入标题"
        v-model="msg">
      </el-input>
      <div class="date" style="text-align: right;color: #8a8a8a">
        14小时前
      </div>
      <p v-if="!editor">
        {{this.textarea2}}
      </p>
      <el-input
        v-if="editor"
        type="textarea"
        :autosize="{ minRows: 20, maxRows: 20}"
        placeholder="请输入内容"
        v-model="textarea2"
        style="margin: 10px">
      </el-input>
      <div class="ui labeled button" tabindex="0" v-if="!editor">
        <div class="ui red button">
          <i class="eye icon"></i> views
        </div>
        <a class="ui basic red left pointing label">
          1,048
        </a>
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
  name: 'BlogContext',
  props: {
    msg: String,
  },
  data(){
    return{
      editor:false,
      imageUrl: '',
      textarea2: '伪临朝武氏者，性非和顺，地实寒微。昔充太宗下陈，曾以更衣入侍。洎乎晚节，秽乱春宫。潜隐先帝之私，阴图后庭之嬖。入门见嫉，蛾眉不肯让人；掩袖工谗，狐媚偏能惑主。践元后于翚翟，陷吾君于聚麀。加以虺蜴为心，豺狼成性，近狎邪僻，残害忠良，杀姊屠兄，弑君鸩母。人神之所同嫉，天地之所不容。犹复包藏祸心，窥窃神器。君之爱子，幽之于别宫；贼之宗盟，委之以重任。呜呼！霍子孟之不作，朱虚侯之已亡。燕啄皇孙，知汉祚之将尽；龙漦帝后，识夏庭之遽衰。敬业皇唐旧臣，公侯冢子。奉先君之成业，荷本朝之厚恩。宋微子之兴悲，良有以也；袁君山之流涕，岂徒然哉！是用气愤风云，志安社稷。因天下之失望，顺宇内之推心，爰举义旗，誓清妖孽。南连百越，北尽三河，铁骑成群，玉轴相接。海陵红粟，仓储之积靡穷；江浦黄旗，匡复之功何远？班声动而北风起，剑气冲而南斗平。喑呜则山岳崩颓，叱咤则风云变色。以此制敌，何敌不摧；以此攻城，何城不克！公等或居汉位，或协周亲，或膺重寄于爪牙，或受顾命于宣室。言犹在耳，忠岂忘心？一抔之土未干，六尺之孤安在？倘能转祸为福，送往事居，共立勤王之勋，无废旧君之命，凡诸爵赏，同指山河。若其眷恋穷城，徘徊歧路，坐昧先机之兆，必贻后至之诛。试看今日之域中，竟是谁家之天下！移檄州郡，咸使闻知。'
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin: 20px;
  color: black;
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
