<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for>Email</label>
        <input type="email"  placeholder="Email" autocomplete="off" name="email" className='form-control' v-model="user.email"  @blur="validateEmail"  />
        <div className='alert alert-danger' v-if="errors.email">
          {{ errors.email }}
        </div>
      </div>
      <div class="form-group">
        <label for>Password</label>
         <input type="password"  placeholder="Password" autocomplete="off" name="password" className='form-control' v-model="user.password" @blur="validatePassword"  />
         <div className='alert alert-danger' v-if="errors.password">
          {{ errors.password }}
        </div>
      </div>
      <!-- :disabled="isButtonDisabled" -->
      <div class="form-group" v-if="!user.isProcessing">
        <button :disabled="((!user.email || !user.password) || ((!user.email  &&  errors.email) || ((!user.password  &&  errors.password))))"  @click="login" class="btn btn-primary">
          Login
        </button>
      </div>
       <p v-else>Processing .....</p>
      <div className='alert alert-danger' v-if="user.serverErrorMessage">
          {{ user.serverErrorMessage }}
        </div>
    </form>
    <div class="modal" :class="{ 'd-block': user.multiProfileList.length }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Choose Your Profile</h5>
          </div>
          <div class="modal-body">
            <p>
              We found multiple profiles, so please select yours. if not found on the list <a href="#" @click="closeModal()">login again.</a>
            </p>
            <div class="list-group">
              <a v-for="(profile) in user.multiProfileList" :key="profile.id" href="javascript:void(0)" @click="profileChange(profile)" class="list-group-item list-group-item-action">
                {{ profile.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { router } from "@/routes";
import { accountService } from "@/service.js";
import useFormValidation from "@/_helpers/useFormValidation";

export default {
  setup() {
    if (accountService.accountDetails) {
      router.push("/account");
    }
    const defaultState = {
      email: "",
      password: "",
      serverErrorMessage: "",
      multiProfileList: [],
      isProcessing: false
    };
    let user = reactive(defaultState);

    const login = (async () => {
      try {
        user.isProcessing = true;
        resetPageDependent();
        const response = await accountService.login(user);
        user.isProcessing = false;

        const { hasError, hasZeroProfile, profiles } = response;
        resetForm();
        if(hasError) {
          user.serverErrorMessage = response.message;
        } else if(hasZeroProfile) {
          user.serverErrorMessage = 'There is no profile associated with this email address';
        } else if (profiles && profiles.length > 1) {
          user.multiProfileList = profiles;
        }
        setTimeout(() => {  user.serverErrorMessage = ""; }, 1300);
        } catch (e) {
          console.log(e);
        }
      
    });
    const resetForm = () => { user.email = "";  user.password = ""; };
    const resetPageDependent = () => { user.serverErrorMessage = ""; user.multiProfileList = []; };
    const closeModal = () =>{ user.multiProfileList = []; };
    const profileChange = (profile) =>{ accountService.profileSwitch(profile); }
    const { validatePasswordField, validateEmailField, errors } = useFormValidation();
    const validateEmail = () => { validateEmailField("email", user.email); };
    const validatePassword= () => { validatePasswordField("password", user.password); };

    return { login, closeModal, profileChange, user, errors, validateEmail, validatePassword};
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
};
</script>