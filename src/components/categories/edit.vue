<template>
  <article class="">
    <h3>Categoría</h3>
    <section >
      <label for=""><b>Nombre</b></label>
      <v-text-field
        v-model="category.name"
        label="Título"
        :rules="[rules.required]"
      ></v-text-field>

      <v-switch
        :label="`Es una subcategoria ? ${is_subcategory ? 'Si': 'No'}`"
        v-model="is_subcategory"
      ></v-switch>
      <v-flex xs12 v-if="is_subcategory && categories.length > 0">
        <label for=""><b>Selecciona la categoria a la que pertenece</b></label>
        <v-select
          :items="categories"
          v-model="selected_category"
          label="Seleccione la categoria a la que pertenece"
          max-height="400"
          persistent-hint
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>
      <v-radio-group
        v-if="!is_subcategory"
        v-model="category.concept_name">
        <label for=""><b>Esta categoria pertenece a :</b></label>
        <v-radio
          key="Producto"
          label="Producto"
          value="Producto"
        ></v-radio>
        <v-radio
          key="Servicio"
          label="Servicio"
          value="Servicio"
        ></v-radio>
      </v-radio-group>
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
        @click="editCategory()">Editar</v-btn>
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
      url:'https://twenti.s3.us-west-2.amazonaws.com/default_image.svg',
      commerces:[],
      categories:[],
      commerce_selected: null,
      is_subcategory: false,
      selected_category: null,
      category:{
        name: '',
        image: null,
        principal_category_id: null,
        concept_name: "Producto"
      },
      rules: {
        required: value => !!value || 'Campo requerido.',
      }
    }
  },
  methods:{
    findCategory(){
      try {
        this.$http.get('categories/'+this.$route.params.id,
        ).then(function(response){
          console.log(response);
          this.category = response.body.data.attributes
          this.url = this.getServer() + this.category.image.url
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
    editCategory(){
      if(this.validateCategory()){
        try {
          this.$http.put('categories/'+this.$route.params.id, {
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
    is_subcategory(){
      if (this.is_subcategory){
        console.log();
        this.findCategories()
      }
    },
    selected_category(){
      if(this.is_subcategory){
        this.category.principal_category_id = this.selected_category
      }else{
        this.category.principal_category_id = null
      }
    }
  },
  mounted(){
    this.findCategory()
  }
}
</script>
