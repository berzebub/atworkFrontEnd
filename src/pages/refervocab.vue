<template>
  <div style="width:90%; margin:auto;">
    <!-- ตำแหน่ง -->
    <q-select
      outlined
      v-model="positionSelected"
      :options="positionList"
      class="q-pt-md"
      color="indigo-12"
      dense
      map-options
      emit-value
    />
    <!-- ค้นหา -->
    <q-input
      rounded
      standout
      dark
      class="q-pt-md"
      dense
      clearable
      clear-icon="close"
      placeholder="ค้นหา"
      v-model="searchText"
      bg-color="indigo-1"
      input-class="text-black"
    >
      <template v-slot:prepend>
        <q-icon name="fas fa-search" color="indigo-12" />
      </template>
    </q-input>

    <!-- Footer -->
    <div class="row absolute-bottom q-py-sm shadow-20 text-grey-6">
      <div style="width:20%" align="center" class="grey-6" @click="practiceBtn()">
        <q-icon name="fas fa-home" size="20px" />
        <br />แบบฝึกหัด
      </div>
      <div style="width:20%" align="center" class="text-indigo-12">
        <q-icon name="fas fa-book" color="indigo-12" size="20px" />
        <br />คำศัพท์
      </div>
      <div style="width:20%" align="center" class="text-grey-6" @click="refersentence()">
        <q-icon name="fas fa-comment-alt" color="grey-6" size="20px" />
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
      positionList: [],
      positionSelected: "",
      searchText: ""
    };
  },
  methods: {
    practiceBtn() {
      this.$router.push("practicemain");
    },
    refersentence() {
      this.$router.push("refersentence");
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
          this.positionSelected = this.$q.localStorage.getItem("lId");
        });
    },
    loadVocabAll() {
      // db.collection("practice_server")
    }
  },
  mounted() {
    this.loadPosition();
  }
};
</script>

<style scoped>
</style>