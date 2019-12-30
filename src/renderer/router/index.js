import Vue from 'vue'
import Router from 'vue-router'
import Video from "../components/LandingPage/Recommend/Video";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/video/:id',
      name: 'video',
      props: true,
      component: Video
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
