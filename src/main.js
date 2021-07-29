import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import store from '@/store'
import components from '@/components/index';
import '@/index.css'
import '@/assets/tailwind.css'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(router)
    .mount('#app')
