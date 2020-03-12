<template>
  <article class="">
    <h3>Ofertas</h3>
    <div
      style="margin: 20px 0;"
      v-if="offers.length > 0">
      <v-data-table
        :headers="headers"
        :items="offers"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            class="text-xs-center"
            @click="$router.push({name: 'editar_oferta', params:{id: props.item.id}})">
            {{ props.item.title}}
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        @click="$router.push({name: 'crear_oferta'})"
        color="red darken-1"
        style="color: #fff">Crear Oferta</v-btn>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      offers: [],
      headers: [
        {text: 'Titulo', value: 'title'}
      ]
    }
  },
  mounted(){
    this.findOffers()
  },
  methods:{
    findOffers(){
      try {
        this.$http.get('offers',
        ).then(function(response){
          this.offers = response.body.data
          console.log("Congrats");
          console.log(response);
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    }
  }
}
</script>
