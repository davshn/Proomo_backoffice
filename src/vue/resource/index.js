import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3000/api/v1/'
Vue.http.interceptor.before = (request, next) => {
  console.log(request)
  next((response) => {
    console.log(response)
  })
}
