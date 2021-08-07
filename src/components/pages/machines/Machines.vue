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
                <v-toolbar-title>Ermes machines</v-toolbar-title>
              </v-toolbar>
              <!-- FORM -->
              <v-card-text>
                <v-container fluid>
                  <v-row align="center" justify="center">
                    <v-col cols="12">
                      <v-data-table :loading="loading" :headers="headers" :items="values" hide-default-footer>
                        <template v-slot:item.lastModified="{ value }">
                          {{ new Date(value).toLocaleString()}}
                        </template>
                        <template v-slot:item.lastPinged="{ value }">
                          {{ new Date(value).toLocaleString()}}
                        </template>
                        <template v-slot:item.settings="{ item }">
                          <v-icon small color="warning" class="mx-1" style="cursor: pointer" title="Settings" @click="$router.push(`/${item.id}/settings`)"> mdi-cog-outline</v-icon>
                        </template>
                      </v-data-table>
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
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import CONFIG from "@/config";

@Component
export default class Settings extends Vue {
  /* DATA */

  private showCard = false;
  private loading = false;

  private values: any[] = [];

  private headers = [
    {
      text: "MAC address",
      value: "id",
    },
    {
      text: "Last modified",
      value: "lastModified",
    },
    {
      text: "Last pinged",
      value: "lastPinged",
    },
    {
      text: "Settings",
      value: "settings",
    },
  ];

  /* LIFE CYCLE */

  async mounted() {
    this.showCard = true;
    try {
      this.loading = true;
      const response = await axios.get(`${CONFIG.API_URL}/machines`);
      this.values = response.data;
    } finally {
      this.loading = false;
    }
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