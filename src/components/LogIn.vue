<template>
  <v-row justify="center">
    <v-img height="100vh" width="100vw" src="@/assets/forum-landscape.jpg" />
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="sign-in-title">
          <span class="text-h4"> Sign in </span>
        </v-card-title>
        <v-form>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Username/Email*"
                  required
                  :success="emailValidation.success"
                  :error-messages="emailValidation.error"
                  @input="handleReset"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="Password*"
                  type="password"
                  required
                  :success="passwordValidation.success"
                  :error-messages="passwordValidation.error"
                  @input="handleReset"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn block type="submit" @click="signIn" :loading="signingIn">
                  <span class="sign-in-button"> Sign in </span>
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
                <router-link to="/register">
                  <span class="app-bar-primary--text"> Register here! </span>
                </router-link>
              </v-col>

              <!--<v-col cols="12" sm="6">
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="[
                      'Skiing',
                      'Ice hockey',
                      'Soccer',
                      'Basketball',
                      'Hockey',
                      'Reading',
                      'Writing',
                      'Coding',
                      'Basejump',
                    ]"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col>-->
            </v-row>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false"> Close </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { signIn } from "@/services/auth-service";
export default {
  data() {
    return {
      dialog: true,
      checkbox: true,
      email: "",
      password: "",
      signingIn: false,
      apiErrors: "",
    };
  },
  computed: {
    emailValidation() {
      const errorMessages = [];
      if (this.$v.email.$dirty) {
        if (!this.$v.email.required) errorMessages.push("Required");
        if (!this.$v.email.email) errorMessages.push("Invalid Email Address");
        if (this.apiErrors) errorMessages.push(this.apiErrors);
      }

      return {
        success: !this.$v.email.$invalid,
        error: errorMessages,
      };
    },
    passwordValidation() {
      const errorMessages = [];
      if (this.$v.password.$dirty) {
        if (!this.$v.password.required) errorMessages.push("Required");
        if (!this.$v.password.minLength)
          errorMessages.push("Password must be at least 8 characters long.");
      }
      return {
        success: !this.$v.password.$invalid,
        error: errorMessages,
      };
    },
  },
  methods: {
    handleReset() {
      if (!this.emailValidation.error.length) return;
      this.apiErrors = "";
      this.$v.email.$reset();
    },
    signIn() {
      this.$v.$touch();
      if (this.$v.$invalid || this.signingIn) return;
      //Sign in
      this.signingIn = true;
      signIn({
        email: this.email,
        password: this.password,
      })
        .then((res) => {
          if (!res) return;
          this.apiErrors = "";
          this.$router.push({ name: "Home" });
        })
        .catch((e) => {
          if (e?.data?.data?.success) return;
          this.apiErrors = e.response.data?.errors[0];
        })
        .finally(() => {
          this.signingIn = false;
        });
    },
  },
  validations: {
    email: { required, email },
    password: {
      minLength: minLength(8),
      required,
    },
  },
};
</script>
