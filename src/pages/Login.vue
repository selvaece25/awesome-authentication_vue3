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
      <div class="form-group" v-if="!loginState.isProcessing">
        <button :disabled="((!user.email || !user.password) || ((!user.email  &&  errors.email) || ((!user.password  &&  errors.password))))"  @click="login" class="btn btn-primary">
          Login
        </button>
      </div>
       <p v-else>Processing .....</p>
      <div className='alert alert-danger' v-if="loginState.serverErrorMessage">
          {{ loginState.serverErrorMessage }}
        </div>
    </form>
    <div class="modal" :class="{ 'd-block': loginState.multiProfileList.length }" tabindex="-1" role="dialog">
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
              <a v-for="(profile) in loginState.multiProfileList" :key="profile.id" href="javascript:void(0)" @click="profileChange(loginState.activeUser, profile.id)" class="list-group-item list-group-item-action">
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
      serverErrorMessage: "",
      multiProfileList: [],
      isProcessing: false,
      activeUser:'',
    };
    let user = reactive({ email: "", password: "",});
    let loginState = reactive(defaultState);

    const login = (async () => {
      try {
        loginState.isProcessing = true;
        resetPageDependent();
        const response = await accountService.login(user);
        loginState.isProcessing = false;
        const { hasError, hasZeroProfile, profiles, code, email_id } = response;
        resetForm();
        loginState.activeUser = email_id;
        if(code === 404) {
          loginState.serverErrorMessage = 'User account not found';
        } else if (hasError) {
          loginState.serverErrorMessage = response.message;
        }  else if(hasZeroProfile) {
          loginState.serverErrorMessage = 'There is no profile associated with this email address';
        } else if (profiles && profiles.length > 1) {
          loginState.multiProfileList = profiles;
        }
        setTimeout(() => {  user.serverErrorMessage = ""; }, 1300);
        } catch (e) {
          user.serverErrorMessage = 'App catch eror';
        }
    });
    const resetForm = () => { user.email = "";  user.password = ""; };
    const resetPageDependent = () => { loginState.serverErrorMessage = ""; loginState.multiProfileList = []; };
    const closeModal = () =>{ loginState.multiProfileList = []; };
    const profileChange = (email_id, id) =>{ accountService.profileSwitch(email_id, id); }
    const { validatePasswordField, validateEmailField, errors } = useFormValidation();
    const validateEmail = () => { validateEmailField("email", user.email); };
    const validatePassword= () => { validatePasswordField("password", user.password); };

    return { login, closeModal, profileChange, user, loginState, errors, validateEmail, validatePassword};
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