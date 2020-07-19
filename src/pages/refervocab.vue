<template>
  <div>
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
        @input="vocabFilter()"
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
        @keyup="vocabSearch()"
        @clear="vocabFilter()"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-search" color="indigo-12" />
        </template>
      </q-input>
    </div>

    <!-- Vocab list -->
    <div style="height:calc(100vh - 180px); overflow: scroll">
      <div v-for="(item,index) in vocabSelectedList" :key="index">
        <div class="row items-center" style="height:75px;">
          <div style="width:90px">
            <img
              src="../assets/nopic.png"
              alt
              style="position:relative; padding:0px; width:75px;"
              v-if="!item.isImage"
            />
            <img
              :src="'https://storage.cloud.google.com/atwork-dee11.appspot.com/practice/image/' + item.id + '.jpg'"
              alt
              style="width:60px;"
              v-if="item.isImage"
              class="q-ml-sm q-pt-sm"
            />
          </div>
          <div class="col">
            <div>{{item.vocabulary}}</div>
            <div class="text-subtitle2">{{item.meaning}}</div>
          </div>
          <div style="width:40px" align="center">
            <q-icon name="fas fa-volume-up" color="orange"></q-icon>
          </div>
        </div>
        <div style="height:3px" class="bg-grey-2"></div>
      </div>
    </div>

    <!-- Footer -->
    <div class="row fixed-bottom q-py-sm shadow-20 text-grey-6">
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
      vocabAllList: [],
      vocabSelectedList: [],
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
      db.collection("practice_server")
        .where("type", "==", "flashcard")
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              id: data.id,
              searchText: data.data().vocabulary + " " + data.data().meaning
            };

            let final = { ...temp, ...data.data() };

            this.vocabAllList.push(final);
          });
          this.vocabAllList.sort((a, b) => {
            if (a.vocabulary > b.vocabulary) {
              return 1;
            } else {
              return -1;
            }
          });
          this.vocabSelectedList = [];
          this.vocabSelectedList = this.vocabAllList.filter(
            x => x.levelId == this.positionSelected
          );
        });
    },
    vocabFilter() {
      this.vocabSelectedList = [];
      this.vocabSelectedList = this.vocabAllList.filter(
        x => x.levelId == this.positionSelected
      );
    },
    vocabSearch() {
      if (this.searchText == "") {
        this.vocabFilter();
      } else {
        this.vocabSelectedList = [];
        this.vocabSelectedList = this.vocabAllList.filter(
          x =>
            x.levelId == this.positionSelected &&
            x.searchText.indexOf(this.searchText) != -1
        );
      }
    }
  },
  mounted() {
    this.loadPosition();
    this.loadVocabAll();
  }
};
</script>

<style scoped>
</style>