import axios from "axios"
import ApiRoutes from "./ApiRoutes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "XCSRF-TOKEN"
let baseURL = ApiRoutes.BASEURL
const NetworkRequest = axios.create({
  baseURL: ApiRoutes.BASEURL,
  withCredentials: false,
  timeoutErrorMessage: "Your request has timeout. Please try again.",
  timeout: 25000,
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Connection: "keep-alive",
    // "Cache-Control": "no-cache",
    // Pragma: "no-cache",
    // Expires: "0",
    "Access-Control-Allow-Origin": "*",
  },
})
 
NetworkRequest.interceptors.request.use(
  config => {
    console.log('✅ onRequest: API Path', config.url ?? "");
    config.baseURL = baseURL;
    return config;
  },
  error => {
    console.error('❌ onRequest Error:', error?.message || error);
    return Promise.reject(error);
  }
);
 
NetworkRequest.interceptors.response.use(
  response => {
    console.log('onResponse:', response.config.url ?? "");
    return response;
  },
  error => {
    const status = error.response?.status;
    const url = error.config?.url;
    const message = error.message;
 
    console.error('❌ onResponse Error:', {
      status,
      url,
      message,
      data: error.response?.data ?? null,
    });
 
    return Promise.reject(error);
  }
);
 
 
export default NetworkRequest
 
 
 