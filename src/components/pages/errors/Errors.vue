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
                <v-toolbar-title>Ermes errors</v-toolbar-title>
              </v-toolbar>
              <!-- FORM -->
              <v-card-text>
                <v-container fluid>
                  <v-row align="center" justify="center">
                    <v-col cols="12">
                      <v-data-table :loading="loading" :headers="headers" :items="values" hide-default-footer>
                        <template v-slot:item.timestamp="{ value }">
                          {{ new Date(value).toLocaleString() }}
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
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import CONFIG from "@/config";

@Component
export default class Settings extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  id!: string;

  /* DATA */

  private showCard = false;

  private loading = false;

  private headers = [
    {
      text: "Id",
      value: "id",
    },
    {
      text: "Error code",
      value: "error",
    },
    {
      text: "Timestamp",
      value: "timestamp",
    },
  ];

  private values = [];


  

  /* LIFE CYCLE */

  async mounted() {
    this.showCard = true;
    try {
      this.loading = true;
      const response = await axios.get(`${CONFIG.API_URL}/machines/${this.id}/errors`);
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