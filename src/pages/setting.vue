<template>
  <div style="height:100vh">
    <!-- List Item -->
    <div class="q-pa-md">
      <div>{{user.name}}</div>
      <div class="text-subtitle2 text-grey-8">{{user.department}}</div>
    </div>
    <q-separator />
    <div class="q-pa-md row" @click="resetBtn()">
      <div class="col">รีเซตรหัสผ่าน</div>
      <div style="width:30px;">
        <q-icon name="fas fa-chevron-right" />
      </div>
    </div>
    <q-separator />
    <div class="q-pa-md row" @click="logoutBtn()">
      <div class="col">ออกจากระบบ</div>
      <div style="width:30px;">
        <q-icon name="fas fa-chevron-right" />
      </div>
    </div>
    <q-separator />
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
      <div style="width:20%" align="center" class="text-grey-6" @click="referconversation()">
        <q-icon name="fas fa-play-circle" color="grey-6" size="20px" />
        <br />บทสนทนา
      </div>
      <div style="width:20%" align="center" class="text-indigo-12">
        <q-icon name="fas fa-cog" color="indigo-12" size="20px" />
        <br />ตั้งค่า
      </div>
    </div>

    <!-- Dialog reset password -->
    <q-dialog v-model="resetPassword" persistent>
      <q-card style="height:160px; width:320px;">
        <div style="height:105px">
          <q-card-section>
            <div class="q-py-sm">
              <q-icon name="fas fa-redo" color="secondary"></q-icon>
              <span class="text-weight-bold q-pl-md">รีเซตรหัสผ่าน</span>
            </div>

            <span>คุณต้องการรีเซตรหัสผ่าน</span>
            <br />
            <span>{{this.user.email}}</span>
          </q-card-section>
        </div>
        <q-card-actions align="right">
          <q-btn flat label="ยกเลิก" color="blue-grey-10" v-close-popup />
          <q-btn flat label="ตกลง" color="indigo-12" @click="reset2Btn()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog reset password succesful -->
    <q-dialog v-model="resetPasswordFinish" persistent>
      <q-card style="height:160px; width:320px;">
        <div style="height:105px">
          <q-card-section>
            <div class="q-py-sm">
              <q-icon name="far fa-check-circle" color="secondary"></q-icon>
              <span class="text-weight-bold q-pl-md">สำเร็จ</span>
            </div>

            <span>เราทำการส่งอีเมลสำหรับการตั้งค่ารหัสผ่านใหม่ไปยังอีเมลของคุณแล้ว</span>
          </q-card-section>
        </div>
        <q-card-actions align="right">
          <q-btn flat label="ตกลง" color="indigo-12" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog logout -->
    <q-dialog v-model="logout" persistent>
      <q-card style="height:160px; width:320px;">
        <div style="height:105px">
          <q-card-section>
            <div class="q-py-sm">
              <q-icon name="fas fa-sign-out-alt" color="secondary"></q-icon>
              <span class="text-weight-bold q-pl-md">ออกจากระบบ</span>
            </div>

            <span>คุณต้องการออกจากระบบใช่หรือไหม</span>
          </q-card-section>
        </div>
        <q-card-actions align="right">
          <q-btn flat label="ยกเลิก" color="blue-grey-10" v-close-popup />
          <q-btn flat label="ตกลง" color="indigo-12" @click="logoutApp()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { auth, db } from "../router";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        department: ""
      },
      resetPassword: false,
      resetPasswordFinish: false,
      logout: false
    };
  },
  methods: {
    //*********menu***********
    practiceBtn() {
      this.$router.push("practicemain");
    },
    refervocab() {
      this.$router.push("refervocab");
    },
    refersentence() {
      this.$router.push("refersentence");
    },
    referconversation() {
      this.$router.push("referconversation");
    },
    //*********Internal**************
    //เปิดหน้า Dialog สำหรับการ reset password
    resetBtn() {
      this.resetPassword = true;
    },
    //reset password สั่งผ่าน auth แล้วขึ้น Dialog เสร็จสิ้น
    reset2Btn() {
      let _this = this;
      auth.sendPasswordResetEmail(this.user.email).then(function() {
        _this.resetPassword = false;
        _this.resetPasswordFinish = true;
      });
    },
    //เปิด logout dialog
    logoutBtn() {
      this.logout = true;
    },
    logoutApp() {
      auth
        .signOut()
        .then(() => {
          this.$router.push("/");
          this.$q.localStorage.clear();
        })
        .catch(function(error) {});
    },
    //**********mount**********
    //load ข้อมูลผู้ใช้เบื้องต้น
    loadUserInfo() {
      let userKey = this.$q.localStorage.getItem("eId");
      db.collection("employee")
        .doc(userKey)
        .get()
        .then(data => {
          this.user.name = data.data().name;
          this.user.email = data.data().email;
          let departKey = data.data().departmentId;
          db.collection("department")
            .doc(departKey)
            .get()
            .then(data => {
              this.user.department = data.data().name;
            });
        });
    }
  },
  mounted() {
    let _this = this;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        _this.loadUserInfo();
        // User is signed in.
      } else {
        _this.$router.push("/");
        // No user is signed in.
      }
    });
  }
};
</script>

<style scoped>
</style>