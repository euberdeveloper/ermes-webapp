<template>
  <errors :id="id" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Errors from "@/components/pages/errors/Errors.vue";

@Component({
  components: {
    Errors,
  },
})
export default class ErrorsView extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  id!: string;
}
</script>
