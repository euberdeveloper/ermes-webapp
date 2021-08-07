<template>
  <images :id="id" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Images from "@/components/pages/images/Images.vue";

@Component({
  components: {
    Images,
  },
})
export default class ImagesView extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  id!: string;
}
</script>
