
<template>
  <div class="sidebar">

    
    <el-menu
      unique-opened
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item>红旗超市管理系统</el-menu-item>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>商品分类管理
        </template>
        <el-menu-item index="1-1">商品分类列表</el-menu-item>
        <el-menu-item index="1-2">添加商品分类</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-message"></i>商品管理
        </template>
        <el-menu-item index="2-1">商品列表</el-menu-item>
        <el-menu-item index="2-2">添加商品</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>账号管理
        </template>
        <el-menu-item index="3-1">账号列表</el-menu-item>
        <el-menu-item index="3-2">添加账号</el-menu-item>
        <el-menu-item index="3-3">修改密码</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>统计管理
        </template>
        <el-menu-item index="4-1">选项1</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>菜单管理
        </template>
        <el-menu-item index="5-1">选项1</el-menu-item>
        <el-menu-item index="5-2">选项2</el-menu-item>
      </el-submenu> -->
      <!-- 动态数据渲染 加在 template上 -->
      <template v-for='value in menulist'>
        <!-- 没有子集 -->
        <el-menu-item v-if='!value.children' :index='value.index'  :key='value.id'>
          <i class="value.cls"></i>
          <span slot="title">{{value.title}}</span>
        </el-menu-item>
        <!-- 有子集 -->
        <el-submenu v-else :index='value.index' :key="value.id">
          <template slot="title">
            <i class="value.cls"></i>{{value.title}}
          </template>
          <el-menu-item v-for="val in value.children" :index="val.index" :key='val.index'>
            {{val.name}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bol: true,
      menulist: [
        {
          id: 1,
          index: "1",
          cls: "el-icon-menu",
          title: "商品分类管理",
          children: [
            { index: "/home/productClassList", name: "商品分类列表" },
            { index: "/home/productClassAdd", name: "添加商品分类" }
          ]
        },
        {
          id: 2,
          index: "2",
          cls: "el-icon-s-goods",
          title: "商品管理",
          children: [
            { index: "/home/productsList", name: "商品列表" },
            { index: "/home/productsAdd", name: "添加商品" }
          ]
        },
        {
          id: 3,
          index: "3",
          cls: "el-icon-s-custom",
          title: "账号管理",
          children: [
            { index: "/home/accountList", name: "账号列表" },
            { index: "/home/accountAdd", name: "增加账号" },
            { index: "/home/changePwd", name: "修改密码" }
          ]
        },
        {
          id: 4,
          index: "4",
          cls: "el-icon-s-data",
          title: "统计管理",
          children: [
            { index: "/home/sta", name: "销售统计" },
            { index: "/home/stocksta", name: "进货统计" }
          ]
        },
        {
          id: 5,
          index: "5",
          cls: "el-icon-s-tools",
          title: "菜单管理",
          children: [
            { index: "/home/menulist", name: "菜单管理" },
            { index: "/home/menuadd", name: "添加菜单" }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath,this.$router.path);
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar {
  height: 100%;

  .el-menu {
    border: none;
    height: 100%;
  }
  .el-menu-item {
    min-width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 17px;
  }
  .el-submenu__icon-arrow {
    font-size: 12px;
  }
}
</style>