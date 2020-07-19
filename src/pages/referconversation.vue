<template>
  <div>
    <div style="width:90%; margin:auto;" class="q-pb-md">
      <q-select
        outlined
        v-model="positionSelected"
        :options="positionList"
        class="q-pt-md"
        color="indigo-12"
        dense
        map-options
        emit-value
        @input="filterUnit()"
      />
    </div>
    <q-separator />
    <div v-for="(item,index) in unitSelected" :key="index" @click="goToDetail(item.id)">
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
      <div style="width:20%" align="center" class="text-grey-6" @click="refersentence()">
        <q-icon name="fas fa-comment-alt" color="grey-6" size="20px" />
        <br />ประโยค
      </div>
      <div style="width:20%" align="center" class="text-indigo-12">
        <q-icon name="fas fa-play-circle" color="indigo-12" size="20px" />
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
    refersentence() {
      this.$router.push("refersentence");
    },
    setting() {
      this.$router.push("setting");
    },
    //*** Mount */
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
          this.positionSelected = this.$q.localStorage.getItem("lId");
        });
    },
    loadUnitAll() {
      db.collection("unit")
        .where("status", "==", true)
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              id: data.id
            };
            let final = { ...temp, ...data.data() };
            this.unitList.push(final);
          });
          this.unitList.sort((a, b) => a.order - b.order);
          this.filterUnit();
        });
    },
    //ตรวจสอบการ login
    checkLogin() {
      let _this = this;
      auth.onAuthStateChanged(function(user) {
        if (!user) {
          _this.$router.push("/");
          // No user is signed in.
        }
      });
    },

    //***Internal Function */
    filterUnit() {
      this.unitSelected = this.unitList.filter(
        x => x.levelId == this.positionSelected
      );
    },
    goToDetail(unitId) {
      this.$router.push("/referconversationdetail/" + unitId);
    }
  },

  mounted() {
    this.checkLogin();
    this.loadPosition();
    this.loadUnitAll();
  }
};
</script>

<style scoped>
</style>