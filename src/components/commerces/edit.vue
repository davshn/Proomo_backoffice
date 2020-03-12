<template>
  <article class="">
    <h3>Editar Comercio</h3>
    <section >
      <label for=""><b>Nombre</b></label>
      <v-text-field
        v-model="commerce.name"
        label="Nombre"
      ></v-text-field>
      <label for=""><b>Descripción</b></label>
      <v-text-field
        v-model="commerce.description"
        label="Descripción"
        multi-line
      ></v-text-field>

      <label for=""><b>Imagen</b></label>
      <div class="trainers__form--photo_container">
        <label
          for="commercePhoto"
          style="
          width: 160px;
          height: 34px;"
          class="trainers__form--photo_button">Examinar</label>
        <input
          id="commercePhoto"
          type="file"
          @change="onFileChange"
          name="logo">
        <p v-if="!url_change">{{ photo_name }}</p>
      </div>
      <v-flex xs12 style="margin: 25px 0; text-align: center;">
        <img :src="url" alt="" width="400px"/>
      </v-flex>
      <v-btn
        @click="createCommerce()">Editar</v-btn>
      <v-btn @click="$router.push({name: 'comercios'})">Cancelar</v-btn>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return {
      photo_name: 'No se han seleccionado archivos',
      url_change: false,
      url:'https://s3-us-west-2.amazonaws.com/karrottsportlife/default_image.svg',
      commerces:[],
      commerce_selected: null,
      commerce:{
        id:'',
        name: '',
        description: '',
        image: null
      }
    }
  },
  methods:{
    findCommerces(){
      try {
        this.$http.get('commerces/'+this.$route.params.id,
        ).then(function(response){
          console.log(response);
          this.commerce = response.body.data;
          console.log("Congrats");
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    },
    validateCommerce(){
      if(this.commerce.name != '' &&
         this.commerce.description != '' &&
         this.commerce.image != null){
        return true
      } else {
        return false
      }
    },
    createCommerce(){
      if(this.validateCommerce()){
        // try {
        //   this.$http.post('commerces/', {
        //     data:{
        //       attributes: this.commerce
        //     }
        //   }
        //   ).then(function(response){
        //     console.log("Update");
        //     console.log(response);
        //     this.$router.push({name: 'comercios'})
        //   },function(response){
        //     console.log("Error");
        //     console.log(response);
        //   })
        // } catch (e) {
        //   console.log("Error");
        //   console.log(e);
        // }
      } else {
        alert('Por favor, verifique los valores indexados')
      }
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.url = URL.createObjectURL(files[0]);
      this.createImage(files[0])
    },
    createImage (file, name_field) {
      var reader = new FileReader()
      var vm = this
      reader.readAsDataURL(file);
      reader.onload = function () {
        vm.commerce.image = reader.result
      }
    },
  },
  watch:{
    url(){
      this.url_change = true;
    },
  },
  mounted(){
    this.findCommerces()
  }
}
</script>
