<template>
  <div class="container mt-4">
    <h3>{{ label }}</h3>
    <p v-if="label === 'Email id'">{{  accountDetails && accountDetails.user_email  }}</p>
    <p v-if="label !== 'Email id'">{{  accountDetails && accountDetails.user_name  }}</p>
  </div>
</template>

<script>
import { onMounted , reactive } from 'vue';
import { accountService } from '@/service.js';

export default {
   props: {
    label: String,
  },  
    setup() {
      const accountDetails = reactive({user_email: '', user_name:'' });
       async function fetchData() {
           const result =   await accountService.getUserDetails();
           if(result.success) {
             accountDetails.user_email = result.user_email;
             accountDetails.user_name = result.user_name;
           }
         }

    onMounted(() => {
      fetchData();
    });
        return {  accountDetails }
    }
}
</script>