import { createRouter, createWebHistory} from 'vue-router';
import Home from '@/pages/Home';
import Account from '@/pages/Account';
import AccountSubPage from '@/pages/AccountSubPage';
import Login from '@/pages/Login';
import { authGuard } from './auth-guard';


const routes = [
    { path: '/', component: Home },
    { path: '/account', component: Account , beforeEnter: authGuard,
    children: [
        { path: 'user',  component: AccountSubPage, props: { label: 'Email id' } , beforeEnter: authGuard },
        { path: '', component: AccountSubPage, props: { label: 'Email id'  } , beforeEnter: authGuard },
        { path: 'profile', component: AccountSubPage, props: { label: 'Name'  } , beforeEnter: authGuard },
      ] },
    { path: '/login', component: Login },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});