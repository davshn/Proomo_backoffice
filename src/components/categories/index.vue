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
            {{ props.item.name}}
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        v-if="getSuperAdmin()"
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
    this.findCategories()
  },
  methods:{
    findCategories(){
      try {
        this.$http.get('categories',
        ).then(function(response){
          this.categories = response.body.data
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
