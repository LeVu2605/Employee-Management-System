import axios from "axios";

const axiosConfig = () => {
    // axios.defaults.baseURL = 'https://api.example.com';
    axios.defaults.withCredentials = true;
    // axios.defaults.headers.post['Content-Type'] = 'application/json';

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger

        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error && error.response.data === "Expired token") {
            window.location.href = '/';
            return error && error.response.data;
        }
        if (error && error.status === 403) {
            alert("You do not have permission to access this resources");
            return error && error.response.data;
        }
        return Promise.reject(error);
    });
}

export default axiosConfig