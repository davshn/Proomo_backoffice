<template>
  <article class="">
    <h3>Editar Cupón</h3>
    <section >

      <label for=""><b>Comercios</b></label>
      <v-flex xs12>
        <v-select
          v-if="getSuperAdmin()"
          :items="commerces"
          v-model="coupon.commerce_id"
          label="Seleccione el comercio al que pertenece"
          max-height="400"
          persistent-hint
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>

      <label for=""><b>Nombre</b></label>
      <v-text-field
        v-model="coupon.title"
        label="Nombre"
        :rules="[rules.required]"
      ></v-text-field>
      <label for=""><b>Descripción</b></label>
      <v-text-field
        v-model="coupon.description"
        label="Descripción"
        multi-line
        :rules="[rules.required]"
      ></v-text-field>
      <label for=""><b>Terminos y condiciones</b></label>
      <v-text-field
        v-model="coupon.terms_and_conditions"
        label="Terminos y condiciones"
        multi-line
        :rules="[rules.required]"
      ></v-text-field>
      <label for=""><b>Valor del descuento</b></label>
      <v-text-field
        v-model="coupon.discount_value"
        label="Valor del descuento"
      ></v-text-field>
      <label for=""><b>Categorias</b></label>
      <v-flex xs12>
        <v-select
          :items="categories"
          v-model="selected_categories"
          label="Seleccione las categorias"
          multiple
          max-height="400"
          persistent-hint
          item-text="name"
          item-value="id"
        ></v-select>
      </v-flex>

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

      <v-switch
        v-if="this.getSuperAdmin()"
        :label="`Publicar: ${coupon.published ? 'Si' : 'No'}`"
        v-model="coupon.published"
      ></v-switch>
      <v-switch
        v-if="!coupon.is_online_product"
        :label="`Aplica para cambio por puntos ?: ${coupon.by_points ? 'Si' : 'No'}`"
        v-model="coupon.by_points"
      ></v-switch>
      <v-text-field
        v-if="coupon.by_points && !coupon.is_online_product"
        v-model="coupon.redeem_points"
        label="Puntos para reclamar el cupón"
        :rules="[rules.required]"
      ></v-text-field>
      <v-switch
        v-if="!coupon.by_points"
        :label="`Es un producto de pago online ?: ${coupon.is_online_product ? 'Si' : 'No'}`"
        v-model="coupon.is_online_product"
      ></v-switch>
      <v-text-field
        v-if="coupon.is_online_product && !coupon.by_points"
        v-model="coupon.price"
        label="Precio del producto"
        :rules="[rules.required]"
      ></v-text-field>
      <v-btn
        @click="editCoupon()">Editar</v-btn>
      <v-btn @click="$router.push({name: 'cupones'})">Cancelar</v-btn>
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
      categories:[],
      selected_categories:[],
      coupon:{
        title: '',
        description: '',
        terms_and_conditions: '',
        image: null,
        commerce_id: null,
        published: false,
        discount_value: 0,
        is_online_product: false,
        price: 0,
        by_points: false,
        redeem_points: 0
      },
      rules: {
        required: value => !!value || 'Campo requerido.',
      }
    }
  },
  methods:{
    findCategories(){
      try {
        this.$http.get('categories',
        ).then(function(response){
          console.log(response);
          this.categories = response.body.data
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
    // findCommerces(){
    //   try {
    //     this.$http.get('commerces/',
    //     ).then(function(response){
    //       console.log(response);
    //       this.commerces = response.body.data
    //       console.log("Congrats");
    //     },function(response){
    //       console.log("Error");
    //       console.log(response);
    //     })
    //   } catch (e) {
    //     console.log("Error");
    //     console.log(e);
    //   }
    // },
    findCoupon(){
      try {
        this.$http.get('offers/'+this.$route.params.id,
        ).then(function(response){
          console.log(response);
          this.coupon = response.body.data.attributes;
          this.selected_categories = this.coupon.category_ids
          this.commerces.push(this.coupon.commerce)
          this.url = this.getServer() + this.coupon.image.url
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
    validateCoupon(){
      console.log(this.coupon);
      if(this.coupon.title != '' &&
         this.coupon.description != '' &&
         this.coupon.terms_and_conditions != '' &&
         this.coupon.image != null &&
         this.coupon.commerce_id != null){
        return true
      } else {
        return false
      }
    },
    editCoupon(){
      if(!this.getSuperAdmin()){
        this.coupon.commerce_id = this.getCommerceRef()
      }
      if(this.validateCoupon()){
        try {
          this.$http.put('offers/' + this.$route.params.id, {
            data:{
              attributes: this.coupon,
              category_ids: this.selected_categories
            }
          }
          ).then(function(response){
            console.log("Update");
            console.log(response);
            this.$router.push({name: 'cupones'})
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
        vm.coupon.image = reader.result
      }
    },
  },
  watch:{
    url(){
      this.url_change = true;
    },
  },
  mounted(){
    this.findCategories()
    // this.findCommerces()
    this.findCoupon()
  }
}
</script>
