<script setup lang="ts">
import { provide } from 'vue';
import { appInjectionKey, useAppProvider } from './app.injection';

// Setup
const appContext = useAppProvider()
provide(appInjectionKey, appContext)

// Variables

// Funcs

// Hooks

</script>

<template>
  <v-app>
    <v-main>
      <v-container max-width="95%" class=" mt-md-10 mt-lg-10">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.primary-color {
  color: #DAA520;
}
</style>