<template>
  <div class="sssss">
<!-- 添加账户 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加 账户</span>
      </div>
    </el-card>
  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: {
          username : '',
          password : '',
          checkPass : '',
          email : '',
          role : '',
        }
      }
    }
  }
</script>

<style lang="less" scoped>
//  @import "../../assets/style/css/common.css"
</style>