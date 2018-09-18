<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        aaaaaaaaaaa

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>

import axios from 'axios'

import Vue from 'vue'

function getValueA(coin){
  axio
}

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

      }
  },
  beforeMount() {
 /*     get_data('BTCUSD', 'ETHUSD').then(aaa => {
         this.chartData = aaa;
     }); */
  },
  methods: {
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
