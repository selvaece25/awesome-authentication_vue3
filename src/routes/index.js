import { createRouter, createWebHistory} from 'vue-router';
import Home from '@/pages/Home';
import Account from '@/pages/Account';
import AccountSubPage from '@/pages/AccountSubPage';
import Login from '@/pages/Login';
import { authGuard } from './auth-guard';


const routes = [
    { path: '/', component: Home, name:'home' },
    { path: '/account', component: Account, name:'account' , beforeEnter: authGuard,
    children: [
        { path: 'user',  component: AccountSubPage, name:'account_user', props: { label: 'Email id' } , beforeEnter: authGuard },
        { path: '', component: AccountSubPage , props: { label: 'Email id'  } , beforeEnter: authGuard },
        { path: 'profile', component: AccountSubPage, name:'account_profile', props: { label: 'Name'  } , beforeEnter: authGuard },
      ] },
    { path: '/login', component: Login , name:'login'},
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});