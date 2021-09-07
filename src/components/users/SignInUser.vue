<template>
  <v-row justify="center">
    <v-img height="100vh" width="100vw" src="@/assets/forum-landscape.jpg" />
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="sign-in-title">
          <span class="text-h4"> Sign In </span>
        </v-card-title>
        <form id="create-post-form" @submit.prevent="signIn()">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  type="text"
                  v-model="email"
                  label="Email*"
                  id="email"
                  name="title"
                  placeholder="Enter email address"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  type="show1 ? 'text' : 'password'"
                  label="Password*"
                  id="password"
                  name="title"
                  placeholder="Enter password"
                  required
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
            </v-row>
            <small>*indicates required field</small>
            <v-col cols="12">
              <v-btn block type="submit" v-on:click="signIn(id)">
                <span class="sign-in-button"> Sign In </span>
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-container class="px-0" fluid>
                <v-checkbox
                  v-model="checkbox"
                  :label="'Remember me'"
                ></v-checkbox>
              </v-container>
            </v-col>
            <v-col class="forgot-password" cols="12" sm="6">
              <span class="text-body-2"> Forgot password? </span>
            </v-col>
            <v-col>
              <span> Don't have an account? </span>
              <router-link to="/sign-up">
                <span class="app-bar-primary--text"> Register here! </span>
              </router-link>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text v-on:click="navigate()"> Close </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import { server } from "../../helper";
import router from "../../router";
export default {
  data() {
    return {
      email: "",
      password: "",
      dialog: true,
      checkbox: false,
    };
  },
  create() {
    this.getCustomer()
  },
  methods: {
    getCustomer() {
      axios
        .get(`${server.baseURL}/customer/:customerID`)
        .then(data => (this.customer = data.data));
    },
    signIn() {
      if (this.email != "" && this.password != "") {
        if (this.email == this.customer.email && this.password == this.customer.password) {
          console.log("You have successfully signed in!")
        }
      }
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>