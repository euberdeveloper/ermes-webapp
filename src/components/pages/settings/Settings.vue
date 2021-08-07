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
                <v-toolbar-title>Ermes settings</v-toolbar-title>
              </v-toolbar>
              <!-- FORM -->
              <v-card-text>
                <v-form @keyup.native.enter="update()" v-model="formValid" class="px-8 py-4">
                  <v-container fluid>
                    <v-row align="center" justify="center">
                      <v-col cols="12">
                        <v-data-table v-if="parsedHours.length" :headers="headers" :items="parsedHours" hide-default-footer>
                          <template v-slot:item.delete="{ index }">
                            <v-icon small color="red" class="mx-1" title="Delete" @click="body.hours.splice(index, 1)">mdi-delete</v-icon>
                          </template>
                        </v-data-table>
                        <span class="d-flex align-center">
                          <v-text-field type="text" label="Insert hour" name="insertHour" clearable v-model="insertHour" />
                          <v-btn class="ml-5" color="primary" :disabled="!insertHour" @click="doInsert">ADD</v-btn>
                        </span>
                      </v-col>
                    </v-row>
                    <v-divider class="my-8" />
                    <v-row align="center" justify="center">
                      <v-col cols="6">
                        <v-select
                          label="Pixel Format"
                          name="pxFormat"
                          :items="['PIXFORMAT_RAW', 'PIXFORMAT_JPEG', 'PIXFORMAT_GRAYSCALE']"
                          clearable
                          :rules="[$validator.requiredText('Pixel Format')]"
                          v-model="body.pxFormat"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          type="number"
                          label="Resolution"
                          name="resolution"
                          clearable
                          :rules="[$validator.requiredText('Resolution')]"
                          v-model="body.resolution"
                        />
                      </v-col>
                    </v-row>
                    <v-row align="center" justify="start">
                      <v-col cols="12" class="d-flex">
                        <v-checkbox v-model="body.paused" label="Paused" />
                        <v-checkbox v-model="body.backup" label="Backup" class="ml-6" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <!-- BUTTON -->
              <v-card-actions class="d-flex justify-center pb-4">
                <v-btn color="primary" large @click="body = {...resetBody}">RESET</v-btn>
                <v-btn color="primary" large :disabled="!formValid" :loading="loading" @click="update()">UPDATE</v-btn>
              </v-card-actions>
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

export interface Config {
  paused: boolean;
  backup: boolean;
  resolution: number;
  pxFormat: string;
  hours: string[];
}

export type ConfigBody = Pick<Config, "paused" | "backup" | "resolution" | "pxFormat" | "hours">;

@Component
export default class Settings extends Vue {
  /* PROPS */

  @Prop({ type: String, default: "1" })
  id!: string;

  /* DATA */

  private showCard = false;

  private formValid = false;
  private loading = false;

  private body = this.getEmptyBody();
  private resetBody: any = this.getEmptyBody();
  private insertHour = "";

  private headers = [
    {
      text: "Hour",
      value: "value",
    },
    {
      text: "Delete",
      value: "delete",
    },
  ];

  /* GETTERS */

  get parsedHours() {
    return this.body.hours.map((el) => ({ value: el }));
  }

  /* METHODS */

  getEmptyBody(): ConfigBody {
    return {
      paused: false,
      backup: false,
      resolution: 23,
      pxFormat: "YYY",
      hours: [],
    };
  }

  async update(): Promise<void> {
    if (this.formValid && !this.loading) {
      try {
        this.loading = true;
        await axios.post(`${CONFIG.API_URL}/machines/${this.id}`, this.body);
        this.resetBody = {...this.body};
      } finally {
        this.loading = false;
      }
    }
  }

  doInsert() {
    this.body.hours.push(this.insertHour);
    this.insertHour = "";
    this.body.hours = this.body.hours.sort();
  }

  /* LIFE CYCLE */

  async mounted() {
    this.showCard = true;
    try {
      const response = await axios.get(`${CONFIG.API_URL}/machines/${this.id}/frontend`);
      delete response.data.id;
      delete response.data.lastModified;
      delete response.data.lastPinged;
      this.resetBody = { ...response.data };
      this.body = response.data;
    } catch (error) {
      console.log(error);
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