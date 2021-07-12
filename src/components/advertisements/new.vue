<template>
  <article class="">
    <h3>Crear Anuncio</h3>
    <v-flex xs12>
      <v-select
          :items="commerces"
          v-model="commerce_selected"
          label="Selecciona el comercio al que pertenece el anuncio"
          item-text="title"
        ></v-select>
    </v-flex>
    <section >
      <label for=""><b>Titulo</b></label>
      <v-text-field
        v-model="advertisement.title"
        label="Título"
      ></v-text-field>
      <label for=""><b>Texto</b></label>
      <v-text-field
        v-model="advertisement.text"
        label="Texto"
        multi-line
      ></v-text-field>

      <label for=""><b>Imagen</b></label>
      <div class="trainers__form--photo_container">
        <label
          for="articlePhoto"
          style="
          width: 160px;
          height: 34px;"
          class="trainers__form--photo_button">Examinar</label>
        <input
          id="articlePhoto"
          type="file"
          @change="onFileChange"
          name="logo">
        <p v-if="!url_change">{{ photo_name }}</p>
      </div>
      <v-flex xs12 style="margin: 25px 0; text-align: center;">
        <img :src="url" alt="" width="400px"/>
      </v-flex>
      <v-btn
        @click="createAdvertisement()">Crear</v-btn>
      <v-btn @click="$router.push({name: 'anuncios'})">Cancelar</v-btn>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return {
      photo_name: 'No se han seleccionado archivos',
      url_change: false,
      url:'https://twenti.s3.us-west-2.amazonaws.com/default_image.svg',
      commerces:[],
      commerce_selected: null,
      advertisement:{
        title: '',
        text: '',
        image: null,
        commerce_id: null,
      }
    }
  },
  methods:{
    findCommerces(){
      try {
        this.$http.get('commerces/',
        ).then(function(response){
          console.log(response);
          this.commerces = response.body.data
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
    validateAdvertisement(){
      if(this.advertisement.title != '' &&
         this.advertisement.text != '' &&
         this.advertisement.image != null){
        return true
      } else {
        return false
      }
    },
    createAdvertisement(){
      if(this.validateAdvertisement()){
        try {
          this.$http.post('advertisements/', {
            data:{
              attributes: this.advertisement
            }
          }
          ).then(function(response){
            console.log("Update");
            console.log(response);
            this.$router.push({name: 'anuncios'})
          },function(response){
            console.log("Error");
            console.log(response);
          })
        } catch (e) {
          console.log("Error");
          console.log(e);
        }
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
        vm.advertisement.image = reader.result
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
