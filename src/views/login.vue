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
            <el-input v-model="loginFromRule.password"></el-input>
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
    go() {
      this.$router.push("/home");
    },
    submitForm(loginFrom) {
          this.$refs[loginFrom].validate((valid) => {
          if (valid) {
            this.go();
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


