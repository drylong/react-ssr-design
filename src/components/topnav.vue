
<template>
  <div class="top-nav">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <el-menu-item index="1">首 页</el-menu-item>
        </el-col>
        <el-col :span='4' :push="6">
          <el-menu-item index="3">
            头像  欢迎登陆
          </el-menu-item>
        </el-col>
        <el-col :span="3" :pull='1' >
          <el-submenu index="2">
            <template slot="title">账号信息</template>
            <el-menu-item index="2-1">权限</el-menu-item>
            <el-menu-item index="2-2">个人中心</el-menu-item>
            <el-menu-item index="2-3">账户管理</el-menu-item>
            <el-menu-item index="2-3">退出登录</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
        </el-col>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.top-nav {
  height: 100%;
  width: 100%;
  .el-menu  {
  height: 100%;
  width: 100%;

  }
.el-menu-item {
    text-align: center;
    font-size: 17px;
  }
}
</style>