import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// Vue.http.options.root = 'http://192.168.0.7:4000/api/v1/'
Vue.http.options.root = 'http://ec2-54-191-209-22.us-west-2.compute.amazonaws.com/api/v1/'
Vue.http.interceptor.before = (request, next) => {
  console.log(request)
  next((response) => {
    console.log(response)
  })
}
