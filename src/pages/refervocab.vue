<template>
  <div style="height:100vh">
    หน้าแบบฝึกหัด
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
export default {
  data() {
    return {};
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
    }
  }
};
</script>

<style scoped>
</style>