<template>
  <div style="width:90%; margin:auto;">
    <q-select
      outlined
      v-model="positionSelected"
      :options="positionList"
      class="q-pt-md"
      filled
      map-options
      emit-value
      @input="filterUnit()"
    />

    <div v-for="(item,index) in unitSelected" :key="index">
      <q-item clickable v-ripple>
        <q-item-section>{{item.name}}</q-item-section>
        <q-item-section side>
          <q-icon name="fas fa-chevron-right" size="15px" />
        </q-item-section>
      </q-item>
      <q-separator />
    </div>

    <!-- Footer -->
    <div class="row absolute-bottom q-py-sm shadow-20 text-grey-6">
      <div style="width:20%" align="center" class="grey-6" @click="practiceBtn()">
        <q-icon name="fas fa-home" size="20px" />
        <br />แบบฝึกหัด
      </div>
      <div style="width:20%" align="center" class="text-grey-6" @click="refervocab()">
        <q-icon name="fas fa-book" color="grey-6" size="20px" />
        <br />คำศัพท์
      </div>
      <div style="width:20%" align="center" class="text-indigo-12">
        <q-icon name="fas fa-comment-alt" color="indigo-12" size="20px" />
        <br />ประโยค
      </div>
      <div style="width:20%" align="center" class="text-grey-6" @click="referconversation()">
        <q-icon name="fas fa-play-circle" color="grey-6" size="20px" />
        <br />บทสนทนา
      </div>
      <div style="width:20%" align="center" class="text-grey-6" @click="setting()">
        <q-icon name="fas fa-cog" color="grey-6" size="20px" />
        <br />ตั้งค่า
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../router/index.js";
export default {
  data() {
    return {
      positionSelected: "",
      positionList: [],
      unitList: [],
      unitSelected: []
    };
  },
  methods: {
    practiceBtn() {
      this.$router.push("practicemain");
    },
    refervocab() {
      this.$router.push("refervocab");
    },
    referconversation() {
      this.$router.push("referconversation");
    },
    setting() {
      this.$router.push("setting");
    },
    loadPosition() {
      this.positionList = [];
      db.collection("level")
        .where("status", "==", true)
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              value: data.id,
              label: data.data().name
            };
            this.positionList.push(temp);
          });
          this.positionList.sort((a, b) => {
            return a.name > b.name ? -1 : 1;
          });
          this.positionSelected = this.positionList[0].value;
        });
    },
    loadUnitAll() {
      db.collection("unit")
        .orderBy("order")
        .get()
        .then(doc => {
          doc.forEach(data => {
            this.unitList.push(data.data());
          });
          this.filterUnit();
        });
    },
    filterUnit() {
      this.unitSelected = this.unitList.filter(
        x => x.levelId == this.positionSelected
      );
    }
  },

  async mounted() {
    await this.loadPosition();
    await this.loadUnitAll();
  }
};
</script>

<style scoped>
</style>