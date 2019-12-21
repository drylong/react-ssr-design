
<template>
  <div class="home">
    <el-container class="sss">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)" class="out-div">
          <sidebar></sidebar>
        </el-aside>

        <el-container>
          <!-- 头部 -->
          <el-header>
            <topnav></topnav>
          </el-header>
          <!-- 主体 -->
          <el-main>
            <homeMain></homeMain>
          </el-main>
        </el-container>
      </el-container>
      <!-- 底部 -->
      <el-footer>
        <homeFooter></homeFooter>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import sidebar from "@/components/sidebar.vue";
import topnav from "@/components/topnav.vue";
import homeMain from "@/components/main.vue";
import homeFooter from "@/components/footer.vue";
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
  },
  components: {
    sidebar,
    homeMain,
    topnav,
    homeFooter
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .sss {
    height: 100%;
  }

  .el-header {
    padding: 0;
  }
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }



  body > .el-container {
    margin-bottom: 40px;
  }



 
  .out-div {
    width: 200px;
    max-height: 100%;
    -ms-overflow-style: none;
    overflow-y: auto;
  }
  .out-div::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>