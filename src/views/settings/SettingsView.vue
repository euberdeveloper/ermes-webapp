<template>
  <settings :id="id" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Settings from "@/components/pages/settings/Settings.vue";

@Component({
  components: {
    Settings,
  },
})
export default class SettingsView extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  id!: string;
}
</script>
