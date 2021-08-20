<template>
  <div class="container mt-4">
    <h3>{{ label }}</h3>
    <p>{{ label === 'Email id' ? account && account.user.username : account && account.profileDetails.name }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { accountService } from '@/service.js';

export default {
   props: {
    label: String,
  },  
    setup() {
        const account = ref(null);
        accountService.account.subscribe(x => account.value = x);
        return {  account }
    }
}
</script>