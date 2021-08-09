<template>
  <v-row justify="center">
    <v-img height="100vh" width="100vw" src="@/assets/forum-landscape.jpg" />
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="sign-in-title">
          <span class="text-h4"> Register </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="First Name*"
                  required
                  v-model="firstName"
                  :success="firstNameValidation.success"
                  :error-messages="firstNameValidation.error"
                  @input="handleReset(firstNameValidation.error, 'lastName')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  required
                  :success="lastNameValidation.success"
                  :error-messages="lastNameValidation.error"
                  @input="handleReset(lastNameValidation.error, 'lastName')"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email Address"
                  :success="emailValidation.success"
                  :error-messages="emailValidation.error"
                  @input="handleReset(emailValidation.error, 'email')"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :success="passwordValidation.success"
                  :error-messages="passwordValidation.error"
                  @input="handleReset(passwordValidation.success, 'password')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="passwordConfirmation"
                  label="Re-type Password*"
                  type="password"
                  :success="passwordConfirmationValidation.success"
                  :error-messages="passwordConfirmationValidation.error"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Phone Number (optional)" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="[
                    '0 - 17',
                    '18 - 21',
                    '21 - 30',
                    '30 - 45',
                    '45 - 60',
                    '60 +',
                  ]"
                  label="Age (optional)"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-col cols="12">
                  <v-btn
                    block
                    type="submit"
                    @click="signUp"
                    :loading="signingIn"
                  >
                    <span class="sign-in-button"> Sign Up </span>
                  </v-btn>
                </v-col>
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
                <router-link to="/log">
                  <span class="app-bar-primary--text"> Sign in here! </span>
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
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text>
            <router-link to="/home"> Save </router-link>
          </v-btn>
          <v-btn text>
            <router-link to="/home"> Close </router-link>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { signUp } from "@/services/auth-service";
export default {
  data() {
    return {
      dialog: true,
      checkbox: true,
      email: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      apiErrors: {},
      signingIn: false,
    }
  },
  computed: {
    firstNameValidation() {
      const errorMessages = [];
      if (this.$v.firstName.$dirty) {
        if (!this.$v.firstName.required) errorMessages.push("Required");
        if (this.apiErrors.firstName)
          errorMessages.push(this.apiErrors.firstName);
      }
      return {
        success: !this.$v.firstName.$invalid,
        error: errorMessages,
      };
    },
    lastNameValidation() {
      const errorMessages = [];
      if (this.$v.lastName.$dirty) {
        if (!this.$v.lastName.required) errorMessages.push("Required");
        if (this.apiErrors.lastName)
          errorMessages.push(this.apiErrors.lastName);
      }
      return {
        success: !this.$v.lastName.$invalid,
        error: errorMessages,
      };
    },
    emailValidation() {
      const errorMessages = [];
      if (this.$v.email.$dirty) {
        if (!this.$v.email.required) errorMessages.push("Required");
        if (!this.$v.email.email) errorMessages.push("Invalid Email Address");
        if (this.apiErrors.email) errorMessages.push(this.apiErrors.email);
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
        if (!this.$v.password.passwordsMustMatch)
          errorMessages.push("Passwords must match.");
        if (this.apiErrors.password)
          errorMessages.push(this.apiErrors.password);
      }
      return {
        success: !this.$v.password.$invalid,
        error: errorMessages,
      };
    },
    passwordConfirmationValidation() {
      const errorMessages = [];
      if (this.$v.passwordConfirmation.$dirty) {
        if (!this.$v.passwordConfirmation.required)
          errorMessages.push("Required");
        if (!this.$v.passwordConfirmation.passwordsMustMatch)
          errorMessages.push("Passwords must match.");
      }
      return {
        success: !this.$v.passwordConfirmation.$invalid,
        error: errorMessages,
      };
    },
  },
  methods: {
    handleReset(errorMessages, attribute) {
      if (!errorMessages.length) return;
      delete this.apiErrors[attribute];
      this.$v[attribute].$reset();
    },
    signUp() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      //Sign in
      this.signingIn = true;
      signUp({
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        firstName: this.firstName,
        lastName: this.lastName,
      })
        .finally((val) => {
          if (!val) return;
          this.apiErrors = {};
          this.$router.push({ name: "Home" });
        })
        /*-.catch((e) => {
          if (e?.data?.data?.success) return;
          this.apiErrors = e.response.data?.errors[0];
        })
        .finally(() => {
          this.signingIn = false;
        });*/
    },
  },
  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    password: {
      minLength: minLength(8),
      required,
      passwordsMustMatch: (value, parent) =>
        value === parent.passwordConfirmation,
    },
    passwordConfirmation: {
      required,
      passwordsMustMatch: (value, parent) => value === parent.password,
    },
  },
};
</script>