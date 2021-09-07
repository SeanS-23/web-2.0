<template>
  <v-row justify="center">
    <v-img height="100vh" width="100vw" src="@/assets/forum-landscape.jpg" />
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="sign-in-title">
          <span class="text-h4"> Sign Up </span>
        </v-card-title>
        <form id="create-post-form" @submit.prevent="createCustomer">
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  type="text"
                  v-model="first_name"
                  label="First Name*"
                  id="first_name"
                  name="title"
                  placeholder="Enter firstname"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="text"
                  v-model="last_name"
                  label="Last Name*"
                  id="last_name"
                  name="title"
                  placeholder="Enter lastname"
                  required
                ></v-text-field>
              </v-col>
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
              <v-col cols="12" sm="6">
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
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="passwordConfirm"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  type="show1 ? 'text' : 'passwordConfirm'"
                  label="Password Confirm*"
                  id="passwordConfirm"
                  name="title"
                  placeholder="Enter password again"
                  required
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="text"
                  v-model="phone"
                  label="Phone Number (optional)"
                  id="phone_number"
                  name="title"
                  placeholder="Enter phone number"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="text"
                  v-model="address"
                  label="Home Address (optional)"
                  id="address"
                  name="title"
                  placeholder="Enter home address"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="text"
                  v-model="description"
                  label="Description (optional)"
                  id="description"
                  name="title"
                  placeholder="Enter description"
                ></v-text-field>
              </v-col>
            </v-row>
            <small>*indicates required field</small>
            <v-col cols="12">
              <v-btn block type="submit">
                <span class="sign-in-button"> Sign Up </span>
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
              <span> Already have an account? </span>
              <router-link to="/sign-in">
                <span class="app-bar-primary--text"> Sign in here! </span>
              </router-link>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text v-on:click="navigate()"> Close
            </v-btn>
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
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      address: "",
      description: "",
      dialog: true,
      checkbox: false,
      show1: false,
    };
  },
  methods: {
    createCustomer() {
      let customerData = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        phone: this.phone,
        address: this.address,
        description: this.description,
      };
      this.__submitToServer(customerData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/customer/create`, data).then(() => {
        router.push({ name: "Home" });
      });
    },  
    navigate() {
      router.go(-1);
    }
  },
};
</script>