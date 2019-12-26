<template>
  <div class="account-add">
<!-- 添加账户卡片 -->
    <el-card class="box-card" shadow='hover'>
      <div slot="header" class="clearfix">
        <span><i class="el-icon-s-custom"> </i>添加账户</span>
      </div>
    <!-- 表单  -->
      <el-form :model="tableData" label-position="left" label-width="100px" :rules="rules" ref="formName">
        <el-form-item label="账户名：" prop="username">
          <el-input v-model="tableData.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password" >
          <el-input v-model="tableData.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码：" prop="checkPass">
          <el-input v-model="tableData.checkPass" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" >
          <el-input v-model="tableData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限：" prop="role">
          <el-select v-model="tableData.role" class="inputs" placeholder="请选择权限">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="普通员工" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btnfa">
          <el-button type="primary" icon="el-icon-edit" class="btn" @click="submit('formName')">确认添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  
  </div>
</template>

<script>
import qs from 'qs';
import {accountAdd} from '@/api/account.js'
  export default {
    data() {
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.tableData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        tableData: {
          username : '',
          password : '',
          checkPass : '',
          email : '',
          role : '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' }
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'change' }
          ],
          role: [
            { required: true, message: '请选择用户权限', trigger: 'change' },
          ],
        }
      }
    },
    methods: {
      // 确定提交按钮
      submit(formName) {
        const v = this;
        this.$refs[formName].validate( (valid) => {
          if(valid) {
            accountAdd(qs.stringify(v.tableData)).then( rsdata => {
              if(rsdata) {
                alert(rsdata.message);
              }
            })
          }else {
            return false;
          }
        })
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      }
    }
  }
</script>

<style lang="less" scoped>
//  @import "../../assets/style/css/common.css"
.account-add {
   // 卡片样式
  .box-card {
    width: 800px;
    padding: 20px 50px 30px;
    margin: 0 auto;
  }    //清除浮动
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  // 下拉表单 样式
  .inputs {
    width: 250px;
  }
  //按钮样式
  .btnfa {
    text-align: center;
  }
  .btn {
    width: 150px;
  }
}
</style>