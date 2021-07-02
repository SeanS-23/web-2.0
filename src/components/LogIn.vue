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
          <span class="text-h4"> Sign in </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Username/Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn block>
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
                <span> Register here! </span>
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
            <router-link to="/"> Save </router-link>
          </v-btn>
          <v-btn text>
            <router-link to="/"> Close </router-link>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "LogIn",

  data: () => ({
    dialog: true,
    checkbox: true,
  }),
};
</script>
