<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap align-center >
        <v-flex xs12>
          <v-card >
            <v-btn
              color="success"
              @click="create_project()"
            >
              Добавить проект
            </v-btn>

            <v-card>
              <v-card-title>

                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Поиск "
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="projects"
                :search="search"
              >
                <template slot="items" slot-scope="props">
                  <td><a href="#">{{ props.item.project_name }}</a></td>
                  <td class="text-xs-right"><a :href="props.item.project_site">сайт</a></td>
                  <td class="text-xs-right">{{ props.item.project_sector }}</td>
                  <td class="text-xs-right">{{ props.item.project_rank }}</td>
                  <td class="text-xs-right"> <v-btn fab dark small color="orange"><v-icon @click.native="edit_project(props.item._id)" dark>edit</v-icon></v-btn></td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Your search for "{{ search }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>

          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>


<!-- ДИАЛОГИ* -->
    <v-dialog
      v-model="edit_project_dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

import axios from 'axios'
import router from '../router'
import Vue from 'vue'







export default {
  data() {
      return {
      edit_project_dialog: false,
      search: '',
      headers: [
        {
          text: 'Имя',
          align: 'left',
          sortable: false,
          value: 'project_name'
        },
        { text: 'Сайт', value: 'project_site',align: 'left' },
        { text: 'Область', value: 'project_sector',align: 'left' },
        { text: 'Рейтинг', value: 'project_rank',align: 'left' },
        { text: '', value: '',align: 'left' },

      ],
      projects: [],
      }
  },
  beforeMount() {
    const vm = this;
    var url = vm.$root.server_route+vm.$root.server_port+'/projects';
    axios.post(url)
     .then(function (response) {
      vm.projects = response.data
      console.log(response)
     })
     .catch(function (error) {
       console.log(error)
     })
 /*     get_data('BTCUSD', 'ETHUSD').then(aaa => {
         this.chartData = aaa;
     }); */
  },
  methods: {
  edit_project(item_id){
    const vm = this;
    vm.edit_project_dialog = true;
    console.log(item_id);
  },

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


  name: 'Projects'
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
