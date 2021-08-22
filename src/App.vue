<template>
    <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark" >
        <div class="navbar-nav">
            <router-link to="/" active-class="active" class="nav-item nav-link">Home</router-link>
            <router-link to="/account" active-class="active" v-if="isLoggedIn" class="nav-item nav-link">My Account</router-link>
            <a class="nav-item nav-link" v-if="isLoggedIn" @click="logout">Logout</a>
            <router-link to="/login" active-class="active" v-else class="nav-item nav-link">Login</router-link>
        </div> 
    </nav>
    <div class="container pt-4">
        <router-view></router-view>
    </div>
    </div>
</template>

<script>
import {  computed } from 'vue';
import { useRoute } from 'vue-router';

import { accountService } from '@/service.js';
export default {
setup() {
    const route = useRoute();
    const isLoggedIn = computed(() => {
      return route.name  ? accountService.isLoggedIn() : false;
    });
    return { route, logout: accountService.logout, isLoggedIn };
  },
}
</script>