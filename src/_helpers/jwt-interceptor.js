import axios from 'axios';

export function jwtInterceptor() {
    axios.interceptors.request.use(request => {
        const tokenDetail = localStorage.getItem('user');
        const isApiUrl = request.url.startsWith(process.env.VUE_APP_API_URL);

        if (tokenDetail && isApiUrl) {
            request.headers.common.Authorization = `Bearer ${tokenDetail}`;
        }
        return request;
    });
}