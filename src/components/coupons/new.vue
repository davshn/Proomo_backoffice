<template>
  <article class="">
    <h3>Crear Oferta</h3>
    <section >
      <v-select
        v-model="coupon.client_id"
        :items="clients"
        item-text="email"
        item-value="id"
        label="Cliente"
      ></v-select>
      <v-select
        v-model="coupon.offer_id"
        :items="offers"
        item-text="title"
        item-value="id"
        label="Offer"
      ></v-select>
      <v-select
        v-model="coupon.offer_id"
        :items="commerces"
        item-text="name"
        item-value="id"
        label="Select"
      ></v-select>
      <v-btn
        @click="createOffer()">Crear</v-btn>
      <v-btn @click="$router.push({name: 'coupons'})">Cancelar</v-btn>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return {
      commerces:[],
      commerce_selected: null,
      coupon:{
        title: '',
        offer_id: null
      }
    }
  },
  methods:{
    findOffers(){
      try {
        this.$http.get('offers',
        ).then(function(response){
          console.log(response);
          this.offers = response.body.data
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
    findClients(){
      try {
        this.$http.get('clients',
        ).then(function(response){
          console.log(response);
          this.clients = response.body.data
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
      if(this.coupon.title != '' &&
         this.coupon.offer_id != null){
        return true
      } else {
        return false
      }
    },
    createOffer(){
      if(this.validateOffer()){
        try {
          this.$http.post('coupons', {
            data:{
              attributes: this.coupon
            }
          }
          ).then(function(response){
            console.log("Update");
            console.log(response);
            this.$router.push({name: 'coupons'})
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
    this.findClients();
    this.findOffers();
  }
}
</script>
