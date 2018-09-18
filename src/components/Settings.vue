<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap align-center >
        <v-flex xs12>
          <v-card >
            <v-dialog
              v-model="create_dialog"
              width="500"
            >
              <v-btn
                slot="activator"
                color="success"
                dark
              >
                Добавить классификатор
              </v-btn>

              <v-card>
                <v-card-title
                  class="headline orange lighten-2"
                  primary-title
                >
                  Добавление классификатора
                </v-card-title>

                <v-card-text>
                     <v-text-field
                       v-model="classificator_name"
                       label="Название"
                     ></v-text-field>

                     <v-text-field
                       v-model="classificator_weight"
                       label="Вес"
                     ></v-text-field>


                     <v-select
                        v-model="classificator_published"
                        :items="published_items"
                        label="Участвует ли в рейтинге?"
                     ></v-select>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="orange"
                    flat
                    @click="create_classificator()"
                  >
                    Добавить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

              <v-list two-line>
                <template v-for="(item, index) in classificators">
                  <v-subheader
                    v-if="item.name"
                    :key="item.name"
                  >
                    {{ item.name }}
                    <v-btn color="orange" flat @click='open_edit_classificator(item._id)'> Редактировать </v-btn>
                    <v-btn color="orange" flat @click='open_delete_classificator(item._id)'> Удалить </v-btn>
                  </v-subheader>

                  <v-list-tile-avatar>

                 </v-list-tile-avatar>
                </template>
              </v-list>


          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <v-dialog
      v-model="edit_dialog"
        width="500"
    >
          <v-card>
            <v-card-title
              class="headline orange lighten-2"
              primary-title
            >
              Редактирование классификатора
            </v-card-title>

            <v-card-text>
                 <v-text-field
                   v-model="edit_classificator_name"
                   label="Название"
                 ></v-text-field>

                 <v-text-field
                   v-model="edit_classificator_weight"
                   label="Вес"
                 ></v-text-field>


                 <v-select
                    v-model="edit_classificator_published"
                    :items="published_items"
                    label="Участвует ли в рейтинге?"
                 ></v-select>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="orange"
                flat
                @click="edit_classificator()"
              >
                Редактировать
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>



    <v-dialog
      v-model="delete_dialog"
        width="500"
    >
          <v-card>
            <v-card-title
              class="headline orange lighten-2"
              primary-title
            >
              Удаление классификатора
            </v-card-title>

            <v-card-text>


            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="orange"
                flat
                @click="delete_classificator()"
              >
                Удалить
              </v-btn>
              <v-btn
                color="orange"
                flat
                @click="delete_dialog = false"
              >
                Не надо
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
  </v-container>

</template>
<script>

import axios from 'axios'

import Vue from 'vue'


function get_list(){

}



export default {
  data() {
      return {
          create_dialog: false,
          edit_dialog: false,
          delete_dialog: false,
          published_items: ['Участвует', 'Не участвует'],
          classificator_published: '',
          classificator_weight: '',
          classificator_name: '',
          edit_classificator_published: '',
          edit_classificator_weight: '',
          edit_classificator_name: '',
          editable_classificator:'',
          delitable_classificator:'',
          classificators: []
      }
  },
  beforeMount() {
    const vm = this;
    var url = vm.$root.server_route+vm.$root.server_port+'/classificators';
    axios.post(url)
     .then(function (response) {
       console.log(response);
       vm.classificators = response.data;

     })
     .catch(function (error) {
       console.log(error)
     })
 /*     get_data('BTCUSD', 'ETHUSD').then(aaa => {
         this.chartData = aaa;
     }); */
  },
  methods: {
    create_classificator(){
      const vm = this;

       var url = vm.$root.server_route+vm.$root.server_port+'/create_classificator';
      axios.post(url, {name: vm.classificator_name, weight: vm.classificator_weight, published: vm.classificator_published})
       .then(function (response) {
         console.log(response);
         vm.classificator_name = '';
         vm.classificator_weight = '';
         vm.classificator_published = '';
         var url = vm.$root.server_route+vm.$root.server_port+'/classificators';
         axios.post(url)
          .then(function (response) {
            vm.classificators = response.data;
            vm.create_dialog = false
            //ДИАЛОГ ЗАКРЫТЬ
            //ОБНОВИТЬ ЛИСТ
          })
          .catch(function (error) {
            console.log(error)
          })

       })
       .catch(function (error) {
         console.log(error)
       })
    },
    open_edit_classificator(item_id){
      const vm = this;
      var url = vm.$root.server_route+vm.$root.server_port+'/classificators/'+item_id;
      axios.post(url)
       .then(function (response) {
         vm.edit_classificator_published = response.data[0].published;
         vm.edit_classificator_weight = response.data[0].weight;
         vm.edit_classificator_name = response.data[0].name;
       })
       .catch(function (error) {
         console.log(error)
       })

      this.editable_classificator = item_id;
      this.edit_dialog = true;

    },
    open_delete_classificator(item_id){
      const vm = this;
      vm.delete_dialog = true,
      vm.delitable_classificator = item_id
      console.log(item_id)
    },
    delete_classificator(){
      const vm = this;
      var url = vm.$root.server_route+vm.$root.server_port+'/remove_classificator/'+vm.delitable_classificator;
      axios.post(url)
       .then(function (response) {
         console.log(response)
            var url = vm.$root.server_route+vm.$root.server_port+'/classificators';
            axios.post(url)
             .then(function (response) {
               vm.classificators = response.data;
               vm.delete_dialog = false;
               //ДИАЛОГ ЗАКРЫТЬ
               //ОБНОВИТЬ ЛИСТ
             })
             .catch(function (error) {
               console.log(error)
             })
       })
       .catch(function (error) {
         console.log(error)
       })
    },
    edit_classificator(){
      const vm = this;
      console.log(vm.edit_classificator_name)
      var url = vm.$root.server_route+vm.$root.server_port+'/edit_classificator/'+vm.editable_classificator;
      axios.post(url, {name: vm.edit_classificator_name, weight: vm.edit_classificator_weight, published: vm.edit_classificator_published})
       .then(function (response) {
         console.log(response);
         vm.edit_classificator_name = '';
         vm.edit_classificator_weight = '';
         vm.edit_classificator_published = '';
         var url = vm.$root.server_route+vm.$root.server_port+'/classificators';
         axios.post(url)
          .then(function (response) {
            vm.classificators = response.data;
            vm.edit_dialog = false;
            //ДИАЛОГ ЗАКРЫТЬ
            //ОБНОВИТЬ ЛИСТ
          })
          .catch(function (error) {
            console.log(error)
          })
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


  name: 'Settings'
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
