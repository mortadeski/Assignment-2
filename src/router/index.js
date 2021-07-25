import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import MainPage from "../views/MainPage";

Vue.use(VueRouter)

const routes = [
  {
    path: "/white",
    name: "white",
    component: MainPage,
    props: {color: "#FFFFFF"}
  },

  {
    path: "/blue",
    name: "blue",
    component: MainPage,
    props: {color: "#0000FF"}
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
