<template>
  <v-main>
    <!-- IMAGE OF BACKGROUND -->
    <div class="background" />

    <!-- LOGIN CONTAINER -->
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="8">
          <!-- LOGIN CARD WITH TRANSITION -->
          <v-scale-transition origin="center center">
            <v-card class="elevation-12" v-show="showCard">
              <!-- TITLE -->
              <v-toolbar color="primary" class="d-flex justify-center" dark flat>
                <v-toolbar-title>Ermes images</v-toolbar-title>
              </v-toolbar>
              <!-- FORM -->
              <v-card-text>
                <v-container fluid>
                  <v-row align="center" justify="center">
                    <v-col cols="12" class="d-flex flex-wrap">
                      <img v-for="value of parsedValues" style="height: 100px; width: 100px; margin: 4px;" :src="value" :key="value" :title="value" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-scale-transition>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import CONFIG from "@/config";

@Component
export default class Images extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  id!: string;

  /* DATA */

  private showCard = false;
  private values = [];

  /* GETTERS */

  get parsedValues(): string[] {
    return this.values.map((value) => `${CONFIG.API_URL.replace("/api", "")}${value}`);
  }

  /* METHODS */

  async updateImages() {
    const response = await axios.get(`${CONFIG.API_URL}/machines/${this.id}/images`);
    this.values = response.data;
  }

  /* LIFE CYCLE */

  async mounted() {
    this.showCard = true;
    await this.updateImages();

    setInterval(() => this.updateImages(), 2000);
  }
}
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: url("~@/assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  filter: blur(7px);
}
</style>