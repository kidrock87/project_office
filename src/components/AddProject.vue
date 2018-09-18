<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap align-center >
        <v-flex xs12>
          <v-card class="m-4 pa-4">
            <form class="m-1">

              <v-text-field
                v-model="project_name"
                label="Название"
              ></v-text-field>

              <v-text-field
                v-model="project_sector"
                label="Вид деятельности"
              ></v-text-field>

              <v-text-field
                v-model="project_site"
                label="Сайт"
              ></v-text-field>

            </form>
          </v-card>
        </v-flex>
        <v-flex xs12>
      <v-card>

        <v-list>
          <v-list-tile
            v-for="item in classificators"
            :key="item.name"
            avatar
          >
            <v-list-tile-action  style="width: 70%;">
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-rating v-model="item.rating" @change="rate(item._id, item.rating)"></v-rating>
            </v-list-tile-action>

            <v-list-tile-avatar>

            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
        <v-subheader>
        <v-btn
          color="orange"
          flat
          @click="create_project()"
        >
          Добавить проект
        </v-btn>
      </v-subheader>
      </v-card>
    </v-flex>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>

import axios from 'axios'

import Vue from 'vue'


function intersect(a, b) {
    var d = {};
    var results = [];
    for (var i = 0; i < b.length; i++) {
        d[b[i]] = true;
    }
    for (var j = 0; j < a.length; j++) {
        if (d[a[j]])
            results.push(a[j]);
    }
    return results;
}


export default {
  data() {
      return {
        valid: false,
        project_name: '',
        project_sector: '',
        project_site: '',
        classificators: [],
        rankings: []
      }
  },
  beforeMount() {
    const vm = this;
    var url = vm.$root.server_route+vm.$root.server_port+'/classificators';
    axios.post(url)
     .then(function (response) {
       console.log(response);
       vm.classificators = response.data;
       var rankings = response.data;
       rankings.forEach(function(v){ delete v.weight });
       rankings.forEach(function(v){ delete v.published });
       vm.rankings = rankings;
     })
     .catch(function (error) {
       console.log(error)
     })
  },
  methods: {
    rate(item_id, rating ){
      const vm = this;
      var arr2 = [{"_id": item_id, 'rating': rating}];
      var items = vm.rankings

      var res = items.map(obj => arr2.find(o => o._id === obj._id) || obj);

      console.log(res)


    },
    create_project(){
      const vm = this;
      var rank_result = vm.rankings.map(a => a.rating);
      var total = rank_result.reduce(function(a, b) {
        return a + b;
      });

      rank_result = parseFloat(total/rank_result.length).toFixed(2)
      console.log(rank_result);
      //console.log(rank_result)

      var url = vm.$root.server_route+vm.$root.server_port+'/add_project';
      axios.post(url, {project_name: vm.project_name, project_sector: vm.project_sector, project_site: vm.project_site,rankings: vm.rankings, project_rank: rank_result})
       .then(function (response) {
         console.log(response)
         router.push({ path: '/projects' })
         //vm.classificators = response.data;
         //vm.delete_dialog = false;
         //ДИАЛОГ ЗАКРЫТЬ
         //ОБНОВИТЬ ЛИСТ
       })
       .catch(function (error) {
         console.log(error)
       })
      }
  /*  async create_chart() {
      let lp1 = await axios('http://localhost:3000/tickers/bitfinex/t'+this.crypto1);
      let lp2 = await axios('http://localhost:3000/tickers/bitfinex/t'+this.crypto2);

      let ask1 = lp1.data[0].ask_price;
      let ask2 = lp2.data[0].ask_price;

      var coin1, coin2 = '';
      if(ask1 > ask2){
         coin1 = this.crypto1;
         coin2 = this.crypto2;
      }else{
         coin1 = this.crypto2;
         coin2 = this.crypto1;
      }

      get_data(coin1, coin2).then(aaa => {
          this.chartData = aaa;
      });


    } */
  },


  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
