<template>
  <article class="">
    <h3>Comercios</h3>
    <div
      style="margin: 20px 0;"
      v-if="commerces.length > 0">
      <v-data-table
        v-if="getSuperAdmin()"
        :headers="headers"
        :items="commerces"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            class="text-xs-center"
            @click="$router.push({name: 'editar_comercio', params:{id: props.item.id}})">
            {{ props.item.name }}
          </td>
        </template>
      </v-data-table>
      <v-data-table
        v-else
        :headers="headers"
        :items="commerces"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            v-if="props.item.id == getCommerceRef()"
            class="text-xs-center"
            @click="$router.push({name: 'editar_comercio', params:{id: props.item.id}})">
            {{ props.item.name }}
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        v-if="getSuperAdmin()"
        @click="$router.push({name: 'crear_comercio'})"
        color="red darken-1"
        style="color: #fff">Crear Comercio</v-btn>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      commerces: [],
      headers: [
        {text: 'Titulo', value: 'title'}
      ]
    }
  },
  mounted(){
    this.findCommerces()
  },
  methods:{
    findCommerces(){
      try {
        this.$http.get('commerces',
        ).then(function(response){
          this.commerces = response.body.data
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
