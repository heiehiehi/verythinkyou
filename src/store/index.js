import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    datas:{
      exist:false,
      token:'',
      user:{}
    }
  },
  mutations:{
    Keepdata(state,data){
      console.log(data)
      if (data==null||data.user == null){
        this.state.datas.exist = false;
      }
      else {
        this.state.datas.exist = true;
      }
      this.state.datas.token = data.token;
      this.state.datas.user = data.user;
      window.localStorage.setItem('data',JSON.stringify(this.state));
    },
    setstatus(state,data){
      if (data.datas.user == null){
        this.state.datas.exist = false;
      }
      else {
        this.state.datas.exist = true;
      }
      this.state.datas.token = data.datas.token;
      this.state.datas.user = data.datas.user;
    }
    // readload(){
    //   var data = JSON.parse(window.localStorage.getItem('data'));
    //   console.log(data)
    //   this.Keepdata(data);
    // }
  },
  actions:{
    readload({commit}){
      var data = JSON.parse(window.localStorage.getItem('data'));
      commit('setstatus',data);
    },
    Deleteddata({commit}){
      window.localStorage.clear();
      commit('Keepdata',null);
    },
  }
})

export default store
