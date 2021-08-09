import { pick } from "lodash";
import { serialize } from "object-to-formdata";
const baseURL = "auth";
import store from "@/store";
import vueCookie from "vue-cookie";
import Vue from "vue";

/**
 * @param userModel
 * @returns {Promise<UserAuth>}
 */

 const signUp = (userModel) => {
    return new Promise((resolve, reject) => {
      const body = {
        first_name: userModel.firstName,
        last_name: userModel.lastName,
        email: userModel.email,
        password: userModel.password,
        password_confirmation: userModel.passwordConfirmation,
      };
      Vue.prototype.$http
        .post(baseURL, serialize(body))
        .then((response) => {
          const authHeaders = pick(response.headers, [
            "accessToken",
            "client",
            "expiry",
            "uid",
            "token-type",
          ]);
          if (!Object.keys(authHeaders).length) {
            reject("Something has gone wrong");
            return;
          }
          store.commit("auth/storeAuthentication", authHeaders);
          const contents = {
            tokens: authHeaders,
          };

          vueCookie.set("session", JSON.stringify(contents), { expires: "14D" });
          
          store.commit("user/setUserDetails", response.data.data);
          console.log('You are officially signed UP');
          resolve(true);
        })
        .catch(reject);
    });
  };
  
  /**
   *
   * @param loginModel
   * @returns {Promise<UserAuth>}
   */
  const signIn = (loginModel) => {
    return new Promise((resolve, reject) => {
      const body = {
        email: loginModel.email,
        password: loginModel.password,
      };
      Vue.prototype.$http
        .post(`${baseURL}/log`, serialize(body))
        .then((response) => {
          const authHeaders = pick(response.headers, [
            "access-token",
            "client",
            "expiry",
            "uid",
            "token-type",
          ]);
          if (!Object.keys(authHeaders).length) {
            reject("Something has gone wrong");
            return;
          }
          store.commit("auth/storeAuthentication", authHeaders);
          const contents = {
            tokens: authHeaders,
          };
  
          vueCookie.set("session", JSON.stringify(contents), { expires: "14D" });
  
          store.commit("user/setUserDetails", response.data.data);
          resolve(true);
        })
        .catch(reject);
    });
  };
  
  const validateToken = () => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http
        .get(`${baseURL}/validate_token`)
        .then((response) => {
          store.commit("user/setUserDetails", response.data.data);
          resolve(response);
        })
        .catch(reject);
    });
  };

  export { signUp, signIn, validateToken };