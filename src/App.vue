<template>
  <v-app>
    <router-link to="/log"></router-link>
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
        dense
      >
      </v-text-field>

      <v-btn 
      text 
      class="text-none app-bar-primary--text pl-3 pr-3"
      @click.stop = "dialog = true"
      >
        <router-link to="/log">
          <span class="app-bar-primary--text"> Log in / Sign up </span>
        </router-link>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" text dark v-bind="attrs" v-on="on">
            <v-icon class="primary--color"> mdi-account-outline </v-icon>
            <v-icon class="primary--color"> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-tabs vertical dark>
          <v-tab class="text-none tab-item">
            <v-icon class="primary--color pr-1"> mdi-account </v-icon>
            Profile
          </v-tab>
          <v-tab class="text-none tab-item">
            <v-icon class="primary--color pr-1"> mdi-atom </v-icon>
            Premium
          </v-tab>
          <v-tab class="text-none tab-item">
            <v-icon class="primary--color pr-1"> mdi-bitcoin </v-icon>
            Botcoin
          </v-tab>
          <v-tab class="text-none tab-item">
            <v-icon class="primary--color pr-1"> mdi-help-circle </v-icon>
            FAQ
          </v-tab>
          <v-tab class="text-none tab-item">
            <v-icon class="primary--color pr-1"> mdi-robot-angry </v-icon>
            Rage
          </v-tab>
          <v-tab class="text-none tab-item">
            <v-icon class="primary--color pr-1"> mdi-glasses </v-icon>
            Dev Page
          </v-tab>
        </v-tabs>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
.body,
html,
body {
  background-color: #0a182f;
}

.app-bar-primary--text {
  color: #f8bbd0 !important;
  caret-color: #a7ffeb !important;
}

.app-bar-secondary--text {
  color: #a5d6a7 !important;
  caret-color: #a7ffeb !important;
}

.primary--color {
  color: #f8bbd0 !important;
}

.primary-bg--color {
  background: #f8bbd0 !important;
}

.secondary--color {
  color: #a5d6a7 !important;
}

.secondary-bg--color {
  background: #a5d6a7 !important;
}

.v-application a {
  color: #f8bbd0 !important;
  text-decoration: none;
}

.v-list-item {
  align-items: center;
  display: flex;
  flex: 1 1 100%;
  letter-spacing: normal;
  min-height: 48px;
  width: max-content;
  outline: none;
  padding: 0 0 !important;
  position: relative;
  text-decoration: none;
}

.theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: transparent !important; // erase search bar outline
}

.forgot-password {
  display: flex;
  align-items: center;
}

.sign-in-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign-in-button {
  color: black;
}

.profile-tab-bar {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  width: max-content !important;
}

.tab-item {
  display: flex;
  justify-content: left !important;
}

.tab-item:hover {
  color: #f8bbd0 !important;
}
</style>


<script>
export default {
  name: "App",

  data: () => ({
  }),
};
</script>
