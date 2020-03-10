<template>
  <article class="">
    <h3>Notificaciones</h3>
    <div
      style="margin: 20px 0;"
      v-if="notifications.length > 0">
      <v-data-table
        :headers="headers"
        :items="notifications"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            class="text-xs-center">
            {{ props.item.title.es}}
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        @click="$router.push({name: 'crear_notificacion'})"
        color="red darken-1"
        style="color: #fff">Crear Notificación</v-btn>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      notifications: [],
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
