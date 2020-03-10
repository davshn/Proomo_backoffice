<template>
  <article class="">
    <h3>Categorías</h3>
    <div
      style="margin: 20px 0;"
      v-if="categories.length > 0">
      <v-data-table
        :headers="headers"
        :items="categories"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            class="text-xs-center"
            @click="$router.push({name: 'editar_categoria', params:{id: props.item.id}})">
            {{ props.item.title.es}}
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        @click="$router.push({name: 'crear_categoria'})"
        color="red darken-1"
        style="color: #fff">Crear Categoría</v-btn>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      categories: [],
      headers: [
        {text: 'Titulo', value: 'title'}
      ]
    }
  },
  mounted(){
    // this.findSections()
  },
  methods:{
    // findSections(){
    //   try {
    //     this.$http.get('section/',
    //     ).then(function(response){
    //       this.sections = response.body.sections
    //       console.log("Congrats");
    //       console.log(response);
    //     },function(response){
    //       console.log("Error");
    //       console.log(response);
    //     })
    //   } catch (e) {
    //     console.log("Error");
    //     console.log(e);
    //   }
    // }
  }
}
</script>
