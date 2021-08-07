<template>
  <machines />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Machines from "@/components/pages/machines/Machines.vue";

@Component({
  components: {
    Machines,
  },
})
export default class MachinesView extends Vue {}
</script>
