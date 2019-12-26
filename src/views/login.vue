<template>
  <div class="login">
    <el-row type="flex" align="middle" class="row">
      <el-col :span="6" :offset="8">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="loginFromRule"
          class="ff"
          :rules="rules"
          ref="loginFrom"
        >
          <el-form-item label="用户名：" type="danger" class="cl" prop="username">
            <el-input v-model="loginFromRule.username"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：" prop="password">
            <el-input v-model="loginFromRule.password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btn-fa">
            <el-button @click="submitForm('loginFrom')" class="login-btn">登 录</el-button>
          </el-form-item>
          <!-- <p >
            <el-button class="login-btn" @click="go">登 录</el-button>
          </p> -->
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {login} from '@/api/login.js';
export default {
  data() {
    return {
      labelPosition: "top",
      loginFromRule: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "change" }
        ]
      },
      
    };
  },
  methods: {
    // 成功消息弹框
    successM(mag) {
      const v = this;
      v.$message({
        message: mag,
        type: "success",
        center: true,
        duration: 1000
      });
    },
    // 失败消息弹框
    failM(mag) {
      const v = this;
      v.$message.error({
        message: mag,
        center: true,
        duration: 1500
      });
    },
    go() {
      this.$router.replace("/home");
    },
    // 登录按钮
    submitForm(loginFrom) {
      const v = this;
      this.$refs[loginFrom].validate((valid) => {
        if (valid) {
          // this.go();
          console.log(this.loginFromRule);
          login(this.loginFromRule).then( rsdata => {
            if(rsdata.success) {
              localStorage.setItem('token',rsdata.token);
              v.successM(rsdata.message);
              v.go();
              // localStorage.login = true // 登录状态
            } else {
              v.failM(rsdata.message);
            }
          })
        } else {
          alert('用户名或密码格式输入不正确!');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  background-color: #0a325b;

  .ff {
    background-color: #0a465b;
    padding: 30px;
    border-radius: 2px;
    box-shadow: 0px 9px 37px -7px #000;
  }
  /deep/.el-form-item__label {
    color: #fff;
  }
  .row {
    height: 100%;
  }
  .btn-fa {
    text-align: right;
  }
  .login-btn {
    color: #eee;
    background-color: #0a465b;
    width: 200px;
  }
}
</style>


