import { createApp } from 'vue';
import { router } from './routes';
import App from './App.vue';
import {  jwtInterceptor } from './_helpers/jwt-interceptor';

jwtInterceptor();

function startApp() {
    createApp(App)
        .use(router)
        .mount('#app');
}

startApp();
