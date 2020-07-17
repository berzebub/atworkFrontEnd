<template>
  <div style="width:90%; margin:auto;">
    <div class="mobile-only logincenter">
      <div align="center">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="text-h5 text-indigo-12" align="center">Winner @Hotel</div>

      <!-- Input form -->
      <div>
        อีเมล
        <q-input v-model="loginInput.email" dense="dense" outlined />
      </div>
      <div>
        รหัสผ่าน
        <q-input
          :type="isPwd ? 'password' : 'text'"
          v-model="loginInput.password"
          dense
          outlined
          @keyup.enter="loginBtn()"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>

      <!-- เข้าสู่ระบบ -->
      <div class="q-pt-md">
        <q-btn label="เข้าสู่ระบบ" style="width:100%" color="indigo-12" @click="loginBtn()" />
      </div>

      <!-- ลืมรหัสผ่าน -->
      <div class="q-pt-xl text-indigo-12" align="center">
        <span @click="forgetPassword()" class="cursor-pointer">
          <u>ลืมรหัสผ่าน?</u>
        </span>
      </div>
    </div>
    <div class="desktop-only">Not available</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginInput: {
        email: "",
        password: ""
      },
      isPwd: true
    };
  },
  methods: {
    loginBtn() {
      console.log("test");
      this.$router.push("practicemain");
    },
    forgetPassword() {
      this.$router.push("forgetpassword");
    }
  }
};
</script>

<style scoped>
.logincenter {
  position: relative;
  top: calc(50vh - 175px);
}
</style>