<template>
<div className='container'>
      <header className='jumbotron' v-if="!accountDetails.isLoading">
      <h2>{{ isLoggedIn ? `Welcome back ${accountDetails && accountDetails.user_name}` : 'Welcome to our portal'}} </h2>
      <br/>
      <router-link to="/account" v-if="isLoggedIn" class="btn btn-sm btn-primary">My Account »</router-link>
      <router-link to="/login" v-else class="btn btn-sm btn-primary">Login »</router-link>
      </header>
      <div className='jumbotron' v-else>Loading ....</div>
    </div>
</template>

<script>
import { onMounted , reactive } from 'vue';
import { accountService } from '@/service.js';

export default {
    setup() {
      const accountDetails = reactive({ user_name:'', isLoading: false });
       async function fetchData() {
           accountDetails.isLoading = true;
           const result =   await accountService.getUserDetails();
           accountDetails.isLoading = false;
           if(result.success) {

             accountDetails.user_name = result.user_name;
           }
         }

    onMounted(() => {
      fetchData();
    });
        return {  accountDetails, isLoggedIn: accountService.isLoggedIn() }
    }
}
</script>