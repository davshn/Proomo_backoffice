<template>
  <article class="">
    <h3>Cupones</h3>
    <div
      style="margin: 20px 0;"
      v-if="coupons.length > 0">
      <v-data-table
        :headers="headers"
        :items="coupons"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            class="text-xs-center"
            @click="$router.push({name: 'editar_cupon', params:{id: props.item.id}})">
            {{ props.item.title}}
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        @click="$router.push({name: 'crear_cupon'})"
        color="red darken-1"
        style="color: #fff">Crear Cupon</v-btn>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      coupons: [],
      headers: [
        {text: 'Titulo', value: 'title'}
      ]
    }
  },
  mounted(){
    this.findSections()
  },
  methods:{
    findSections(){
      try {
        this.$http.get('offers/',
        ).then(function(response){
          this.coupons = response.body.data
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
