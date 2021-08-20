import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

import { router } from '@/routes';
import { ErrorHandler } from '@/_helpers/error-handle-response';

const baseUrl = `${process.env.VUE_APP_API_URL}/api/`;
const getUserDetail = localStorage.getItem("user") || null;
const accountSubject = new BehaviorSubject(JSON.parse(getUserDetail));

export const accountService = {
    login,
    logout,
    profileSwitch,
    account: accountSubject.asObservable(),
    get accountDetails () { return accountSubject.value }
};

async function login({ email, password}) {
  try {
    return await axios
    .post(`${baseUrl}login`, { data: { email , password }})
    .then((response) => {
      const { profiles } = response.data;
      let hasZeroProfile = false;
      if(profiles && profiles.length === 1) {
        saveOnLocal({...response.data, isLoggedIn: true, profileDetails: profiles[0]});
        router.push('/account');
      } 
      else if (profiles && profiles.length === 0) {
        hasZeroProfile = true;
      } else if( profiles && profiles.length > 1){
        saveOnLocal({...response.data, isLoggedIn: false, profileDetails: { }});
      }
      return { ...response.data, hasZeroProfile } || {};
    });
  } catch (error){
    const { errMessage = '' } = ErrorHandler(error.response || error);
    return { hasError: true, message: errMessage };
  }
}

function profileSwitch(profile) {
  saveOnLocal({ ...accountService.accountDetails, isLoggedIn: true, profileDetails: profile });
  router.push('/account');
}

function saveOnLocal(payload) {
  accountSubject.next(payload);
  localStorage.setItem("user", JSON.stringify(payload));
}

function logout() {
    accountSubject.next(null);
    localStorage.removeItem("user");
    router.push('/login');
}

