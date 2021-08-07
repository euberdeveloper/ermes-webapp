<template>
  <settings />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Settings from "@/components/pages/settings/Settings.vue";

@Component({
  components: {
    Settings,
  },
})
export default class SettingsView extends Vue {}
</script>
