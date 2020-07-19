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
import { auth, db } from "../router";
export default {
  data() {
    return {
      loginInput: {
        email: "pakkawat.kh@gmail.com",
        password: "chomart12"
      },
      isPwd: true
    };
  },
  methods: {
    loginBtn() {
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        return auth
          .signInWithEmailAndPassword(
            this.loginInput.email,
            this.loginInput.password
          )
          .then(async result => {
            let docUser = await db
              .collection("employee")
              .where("email", "==", this.loginInput.email)
              .get();
            if (docUser) {
              let hId = docUser.docs[0].data().hotelId;
              let lId = docUser.docs[0].data().startLevelId;
              let eId = docUser.docs[0].id;

              this.$q.localStorage.set("hId", hId);
              this.$q.localStorage.set("lId", lId);
              this.$q.localStorage.set("eId", eId);

              this.$router.push("practicemain");
            } else {
              console.log("No database Info");
            }
          })
          .catch(error => {
            console.log("fail");
          });
      });
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