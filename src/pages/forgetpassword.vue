<template>
  <div style="width:90%; margin:auto;" class="logincenter">
    <div class="text-h6" align="center">ลืมรหัสผ่าน</div>
    <div class="q-pt-md" align="center">
      กรุณากรอกอีเมลในช่องข้างล่าง
      <br />เพื่อตั้งค่ารหัสผ่านใหม่
    </div>

    <div class="q-pt-md">
      อีเมล
      <q-input v-model="email" dense="dense" outlined />
    </div>
    <div class="q-pt-md">
      <q-btn label="ส่งข้อมูล" style="width:100%" color="indigo-12" @click="forgetPasswordBtn()" />
    </div>
    <div class="text-indigo-12 q-pt-xl" align="center">
      <span class="cursor-pointer" @click="backBtn()">
        <u>ย้อนกลับ</u>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    forgetPasswordBtn() {
      console.log("test");
    },
    backBtn() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.logincenter {
  position: relative;
  top: calc(50vh - 155px);
}
</style>