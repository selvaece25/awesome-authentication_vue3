import axios from 'axios';

import { router } from '@/routes';
import { ErrorHandler } from '@/_helpers/error-handle-response';

const baseUrl = `${process.env.VUE_APP_API_URL}/api/`;

export const accountService = {
  login,
  logout,
  profileSwitch,
  getUserDetails,
  isLoggedIn,
  token: localStorage.getItem('user'),
};

function isLoggedIn() {
  const hasToken = localStorage.getItem('user') ? true : false;
  return hasToken;
}

async function login({ email, password }) {
  try {
    return await axios
      .post(`${baseUrl}login`, { data: { email, password } })
      .then((response) => {
        const { profiles, token, user } = response.data;
        let hasZeroProfile = false;
        if (profiles && profiles.length === 1) {
          saveOnLocal(token);
          router.push('/account');
        } else if (profiles && profiles.length === 0) {
          hasZeroProfile = true;
        }
        const email_id = (user && user.username) || null;
        return { ...response.data, hasZeroProfile, email_id } || {};
      });
  } catch (error) {
    const { errMessage, code = '' } = ErrorHandler(error.response || error);
    return { hasError: true, message: errMessage, code };
  }
}

function getUserDetails() {
  try {
    return axios
      .get(`${baseUrl}user/details`)
      .then((response) => response.data);
  } catch (error) {
    const { errMessage, code = '' } = ErrorHandler(error.response || error);
    return { hasError: true, message: errMessage, code };
  }
}

async function profileSwitch(email_id, id) {
  try {
    return await axios
      .post(`${baseUrl}user/switch`, { data: { email_id, user_id: id } })
      .then((response) => {
        const { token } = response.data;
        if (token) {
          saveOnLocal(token);
          router.push('/account');
        }
      });
  } catch (error) {
    const { errMessage, code = '' } = ErrorHandler(error.response || error);
    return { hasError: true, message: errMessage, code };
  }
}

function saveOnLocal(token) {
  localStorage.setItem('user', JSON.stringify(token));
}

function logout() {
  localStorage.removeItem('user');
  accountService.isLoggedIn();
  router.push('/login');
}
