

const routes=[
    {path:'/home',component:home},
    {path:'/partlist',component:partlist},
    {path:'/schematic',component:schematic}
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
 })
 
 const app = Vue.createApp({})
app.use(router)
app.mount('#app')