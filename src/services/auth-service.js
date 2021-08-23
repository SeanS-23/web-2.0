import { pick } from "lodash";
import { serialize } from "object-to-formdata";
import store from "@/store";
import vueCookie from "vue-cookie";
import BaseService from "./base-service";

export default class AuthService extends  BaseService {
    constructor() {
        super("auth");
    }
    signUp(userModel){
        return new Promise((resolve, reject) => {
            const body = {
                first_name: userModel.firstName,
                last_name: userModel.lastName,
                email: userModel.email,
                password: userModel.password,
                password_confirmation: userModel.passwordConfirmation,
            };
            this.$http
                .post(this.baseUrl, serialize(body))
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

                    vueCookie.set("session", JSON.stringify(contents), {expires: "14D"});

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
    signIn(loginModel) {
        return new Promise((resolve, reject) => {
            const body = {
                email: loginModel.email,
                password: loginModel.password,
            };
            this.$http
                .post(`${this.baseUrl}/log`, serialize(body))
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

                    vueCookie.set("session", JSON.stringify(contents), {expires: "14D"});

                    store.commit("user/setUserDetails", response.data.data);
                    resolve(true);
                })
                .catch(reject);
        });
    };

    validateToken(){
        return new Promise((resolve, reject) => {
            this.$http
                .get(`${baseURL}/validate_token`)
                .then((response) => {
                    store.commit("user/setUserDetails", response.data.data);
                    resolve(response);
                })
                .catch(reject);
        });
    };

}
