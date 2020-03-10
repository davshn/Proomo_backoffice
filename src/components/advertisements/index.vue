<template>
  <article class="">
    <h3>Anuncios</h3>
    <div
      style="margin: 20px 0;"
      v-if="advertisements.length > 0">
      <v-data-table
        :headers="headers"
        :items="advertisements"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            class="text-xs-center"
            @click="$router.push({name: 'editar_anuncio', params:{id: props.item.id}})">
            {{ props.item.title.es}}
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        @click="$router.push({name: 'crear_anuncio'})"
        color="red darken-1"
        style="color: #fff">Crear Anuncio</v-btn>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      advertisements: [],
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
