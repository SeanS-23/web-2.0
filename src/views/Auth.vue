<template>
  <v-row style="height: 100%" no-gutters>
    <v-col
      cols="12"
      md="6"
      lg="5"
      style="height: 100%; background-color: transparent"
    >
      <v-row style="height: 100%; background: white" align="center">
        <v-col>
          <transition name="fade">
            <router-view />
          </transition>
        </v-col>
      </v-row>
    </v-col>
    
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>