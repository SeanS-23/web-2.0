import axios from "axios";
import { pick } from "lodash";
import router from "./router";
import store from "./store";
import vueCookie from "vue-cookie";

if(!process.env.VUE_APP_API_URL) throw Error("MISSING VUE APP API URL")

const $http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

const setAuthorizedHeaders = (headersResponse) => {
  if (!headersResponse.headers["access-token"]) {
    return headersResponse;
  }

  const authHeaders = pick(headersResponse.headers, [
    "access-token",
    "client",
    "expiry",
    "uid",
    "token-type",
  ]);
  store.commit("auth/storeAuthentication", authHeaders);

  let session = vueCookie.get("session");
  if (!session) {
    return headersResponse;
  }

  session = JSON.parse(session);
  session["tokens"] = authHeaders;

  vueCookie.set("session", JSON.stringify(session), { expires: "14D" });

  return headersResponse;
};

const failedAuthorizedHeaders = (error) => {
  // if (router.currentRoute.name !== "SignIn" && error.response?.status === 401) {
  //   store.commit("user/resetUser");
  //   store.commit("auth/resetAuthentication");
  //   router.push({ name: "SignIn" });
  // }

  return Promise.reject(error);
};

$http.interceptors.response.use(setAuthorizedHeaders, failedAuthorizedHeaders);

$http.interceptors.request.use((config) => {
  const headers = store.getters.getAuthentication;
  if (headers.uid === null) {
    return config;
  }
  const { accessToken, client, expiry, tokenType, uid } = headers;
  config.headers["access-token"] = accessToken;
  config.headers["client"] = client;
  config.headers["expiry"] = expiry;
  config.headers["token-type"] = tokenType;
  config.headers["uid"] = uid;
  return config;
});


export default $http;
