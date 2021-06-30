<template>
  <v-app>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Username/Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

    <v-app-bar app dark class="app-bar">
      <div class="d-flex align-center">
        <v-icon size="32" class="primary--color"> mdi-robot-love </v-icon>
        <span class="text-h6 app-bar-primary--text pl-3 pr-3"> BotBoi </span>
      </div>

      <v-spacer></v-spacer>

      <v-text-field 
      class="search-bar mt-6 pl-3 pr-3"
      placeholder="Search" 
      prepend-inner-icon="mdi-magnify primary--color"
      filled 
      dense>
      </v-text-field>

      <v-btn text class="text-none pl-3 pr-3"> 
        <span 
          class="text-none app-bar-primary--text"
          @click="dialog = true"
        >
          Log In / Sign Up 
        </span>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            text
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="primary--color"> mdi-account-outline </v-icon>
            <v-icon class="primary--color"> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list dark>
          <v-list-item>
            <v-btn text class="text-none app-bar-primary--text"> Tab 1 </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text class="text-none app-bar-primary--text"> Tab 1 </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn text class="text-none app-bar-primary--text">  Tab 1 </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
        
    </v-app-bar>

    <v-main>
      <router-view/>
      
    </v-main>
  </v-app>
</template>

<style lang="scss">
.body,
html,
body {
  background-color: #0a182f;
}

:root .v-application .app-bar-primary--text {
  color: #F8BBD0 !important;
  caret-color: #a7ffeb !important;
}

:root .v-application .app-bar-secondary--text {
  color: #A5D6A7 !important;
  caret-color: #a7ffeb !important;
}

:root .v-application .primary--color {
  color: #F8BBD0 !important;
}

::root .v-application .secondary--color {
  color: #A5D6A7 !important;
}

.theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: transparent !important; // erase search bar outline
}

</style>


<script>
export default {
  name: 'App',

  data: () => ({
      dialog: true,
    })
}
</script>
