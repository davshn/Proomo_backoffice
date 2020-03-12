<template>
  <article class="">
    <h3>Crear Oferta</h3>
    <section >
      <label for=""><b>Nombre</b></label>
      <v-text-field
        v-model="offer.title"
        label="Título"
      ></v-text-field>
      <v-select
        v-model="offer.commerce_id"
        :items="commerces"
        item-text="name"
        item-value="id"
        label="Select"
      ></v-select>
      <v-btn
        @click="createOffer()">Crear</v-btn>
      <v-btn @click="$router.push({name: 'offers'})">Cancelar</v-btn>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return {
      commerces:[],
      commerce_selected: null,
      offer:{
        title: '',
        commerce_id: null
      }
    }
  },
  methods:{
    findCommerces(){
      try {
        this.$http.get('commerces',
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
    validateOffer(){
      if(this.offer.title != '' &&
         this.offer.commerce_id != null){
        return true
      } else {
        return false
      }
    },
    createOffer(){
      if(this.validateOffer()){
        try {
          this.$http.post('offers', {
            data:{
              attributes: this.offer
            }
          }
          ).then(function(response){
            console.log("Update");
            console.log(response);
            this.$router.push({name: 'offers'})
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
  },
  mounted(){
    this.findCommerces()
  }
}
</script>
