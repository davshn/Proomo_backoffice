import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

Vue.mixin({
  methods:{
    ...mapActions([
      "updateLoader",
      "updateLogin",
      "updateUser",
      "updatePassword",
      "updateServer",
      "updateSuperAdmin",
      "updateCommerceRef"
    ]),
    ...mapGetters([
      "getLoader",
      "getLogin",
      "getUser",
      "getPassword",
      "getServer",
      "getSuperAdmin",
      "getCommerceRef"
    ])
  }
})
