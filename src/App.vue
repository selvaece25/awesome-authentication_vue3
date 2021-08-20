<template>
    <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark" >
        <div class="navbar-nav">
            <router-link to="/" active-class="active" class="nav-item nav-link">Home</router-link>
            <router-link to="/account" active-class="active" v-if="account && account.isLoggedIn" class="nav-item nav-link">My Account</router-link>
            <a class="nav-item nav-link" v-if="account && account.isLoggedIn" @click="logout">Logout</a>
            <router-link to="/login" active-class="active" v-else class="nav-item nav-link">Login</router-link>
        </div>
    </nav>
    <div class="container pt-4">
        <router-view></router-view>
    </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { accountService } from '@/service.js';

export default {
    setup() {
        const account = ref(null);
        accountService.account.subscribe(x => account.value = x);

        return {
            account,
            logout: accountService.logout
        }
    }
}
</script>