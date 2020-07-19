<template>
  <div>
    <!-- header -->
    <div class="bg-indigo-12 header text-white text-h6 row">
      <div style="width:50px;" class="q-pl-md q-pt-sm" @click="backBtn()">
        <q-icon name="fas fa-arrow-left"></q-icon>
      </div>
      <div class="q-pt-sm">{{unitName}}</div>
    </div>

    <!-- expression -->
    <div v-for="(item,index) in expressionList" :key="index">
      <div v-for="(item2,index2) in item.expression" :key="index2" class="row">
        <div class="col-12 row q-py-sm items-center" @click="playSound(item.id,index2)">
          <div style="width:80px" class="q-pl-sm">{{item2.speaker=='customer'?'ลูกค้า': 'พนักงาน'}}:</div>
          <div class="col">
            {{item2.sentenceEng}}
            <br />
            <span class="text-grey-8">{{item2.sentenceTh}}</span>
          </div>
          <div style="width:40px" align="center">
            <q-icon name="fas fa-volume-up" color="orange"></q-icon>
          </div>
        </div>
        <div class="col-12">
          <div style="height:2px;" class="bg-grey-3"></div>
        </div>
      </div>

      <div style="height:7px;" class="bg-grey-3"></div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../router/index.js";
export default {
  data() {
    return {
      unitId: "",
      unitName: "",
      expressionList: []
    };
  },
  methods: {
    //mount
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
    //load sentence all
    loadSentence() {
      db.collection("practice_server")
        .where("type", "==", "expression")
        .where("unitId", "==", this.unitId)
        .get()
        .then(doc => {
          doc.forEach(data => {
            let temp = {
              id: data.id
            };
            let final = { ...temp, ...data.data() };
            this.expressionList.push(final);
          });
          this.expressionList.sort((a, b) => a.order - b.order);
        });
    },
    //load หัว header
    loadUnitName() {
      db.collection("unit")
        .doc(this.unitId)
        .get()
        .then(data => {
          this.unitName = data.data().name;
        });
    },

    //internal function
    //ปุ่มย้อนกลับ
    backBtn() {
      this.$router.push("/refersentence");
    },
    //ปุ่มเล่นเสียง
    playSound(sentenceId, index) {
      console.log(sentenceId, index);
    }
  },
  mounted() {
    this.checkLogin();
    this.unitId = this.$route.params.id;
    this.loadUnitName();
    this.loadSentence();
  }
};
</script>

<style scoped>
.header {
  height: 50px;
}
</style>