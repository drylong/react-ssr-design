
<template>
  <div class="top-nav">
    
    <!-- 下拉菜单 -->
    <el-row type="flex" justify="end">
      <el-col :span="6">
        <span>欢迎登录 </span>
        <el-dropdown :hide-on-click="false" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='ge'>个人中心</el-dropdown-item>
            <el-dropdown-item command='tui'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
   
  </div>
</template>

<script>
import { loginOut } from '@/api/login.js';
import tou from '@/assets/images/me.jpg';

export default {
  data() {
    return {
      // 头像
      circleUrl: tou,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 顶部导航退出登录
    handleCommand(command) {
      let token = localStorage.getItem('token');
      if( command === 'tui') {
        loginOut({token}).then( rsdata => {
           if(rsdata.success) {
             localStorage.removeItem('token');
             this.$router.replace('/login');
           }
        })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.top-nav {
  height: 100%;
  width: 100%;

  .el-row {
    height: 100%;
    background-color: red;

    .el-col {
      text-align: center;
      .block {
        display: inline-block;
      }
      // 下拉菜单
      .el-dropdown-link {
        vertical-align: middle;
        cursor: pointer;
        color: #eee;
        line-height: 54px;
        height: 54px;
        display: inline-block;
        margin-top: 3px;
        // display: inline-block;
        // height: 60px;
        // font-size: 17px;
      }
      .el-icon-arrow-down {
        font-size: 12px;
        vertical-align: middle;
        height: 54px;
      }
    }
  }
  
}
</style>