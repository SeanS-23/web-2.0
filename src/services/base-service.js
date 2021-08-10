import Vue from "vue";
import { serialize } from "object-to-formdata";

export default class BaseService {
  $http = Vue.prototype.$http;
  serialize = serialize;
  baseUrl = "http://localhost:3000";
  cancelToken = null;

  constructor(baseUrl) {
    this.$http = Vue.prototype.$http;
    this.serialize = serialize;
    this.baseUrl = baseUrl;
  }
}
