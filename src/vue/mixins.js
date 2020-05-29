import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

Vue.mixin({
  methods:{
    ...mapActions([
      "updateLoader",
      "updateLogin",
      "updateUser",
      "updatePassword",
      "updateServer"
    ]),
    ...mapGetters([
      "getLoader",
      "getLogin",
      "getUser",
      "getPassword",
      "getServer"
    ])
  }
})
