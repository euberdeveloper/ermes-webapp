<template>
  <v-app-bar color="primary" clipped-left dark app>
    <!-- TITLE -->
    <v-toolbar-title class="ml-0 pl-4">
      <span>Ermes settings</span>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Bar extends Vue {
}
</script>