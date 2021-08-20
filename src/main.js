import { createApp } from 'vue';
import { router } from './routes';
import App from './App.vue';


function startApp() {
    createApp(App)
        .use(router)
        .mount('#app');
}

startApp();
