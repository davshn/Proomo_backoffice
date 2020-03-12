<template>
  <article class="">
    <h3>Crear Categoría</h3>
    <section >
      <label for=""><b>Nombre</b></label>
      <v-text-field
        v-model="category.name"
        label="Título"
      ></v-text-field>
      <label for=""><b>Imagen</b></label>
      <div class="trainers__form--photo_container">
        <label
          for="categoryPhoto"
          style="
          width: 160px;
          height: 34px;"
          class="trainers__form--photo_button">Examinar</label>
        <input
          id="categoryPhoto"
          type="file"
          @change="onFileChange"
          name="logo">
        <p v-if="!url_change">{{ photo_name }}</p>
      </div>
      <v-flex xs12 style="margin: 25px 0; text-align: center;">
        <img :src="url" alt="" width="400px"/>
      </v-flex>
      <v-btn
        @click="createCategory()">Crear</v-btn>
      <v-btn @click="$router.push({name: 'categorias'})">Cancelar</v-btn>
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
      category:{
        name: '',
        image: null
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
    validateCategory(){
      if(this.category.name != '' &&
         this.category.image != null){
        return true
      } else {
        return false
      }
    },
    createCategory(){
      if(this.validateCategory()){
        try {
          this.$http.post('categories/', {
            data:{
              attributes: this.category
            }
          }
          ).then(function(response){
            console.log("Update");
            console.log(response);
            this.$router.push({name: 'categorias'})
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
        vm.category.image = reader.result
      }
    },
  },
  watch:{
    url(){
      this.url_change = true;
    },
  },
  mounted(){
    // this.findCommerces()
  }
}
</script>
