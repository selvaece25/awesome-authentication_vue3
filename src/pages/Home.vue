<template>
<div className='container'>
      <header className='jumbotron'>
      <h2>{{ account && account.isLoggedIn ? `Welcome back ${ account.profileDetails.name }` : 'Welcome to our portal'}} </h2>
      <br/>
      <router-link to="/account" v-if="account && account.isLoggedIn" class="btn btn-sm btn-primary">My Account »</router-link>
      <router-link to="/login" v-else class="btn btn-sm btn-primary">Login »</router-link>
      </header>
    </div>
</template>

<script>
import { ref } from 'vue';
import { accountService } from '@/service.js';

export default {
    setup() {
        const account = ref(null);
        accountService.account.subscribe(x => account.value = x);
        return {  account }
    }
}
</script>