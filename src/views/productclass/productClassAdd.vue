<template>
  <div class="productclassadd-box">
    <!-- 卡片 -->
    <el-card shadow="hover" class="card-box">
      <div slot="header" class="clearfix">
        <i class="el-icon-tickets"></i>
        <span>添加商品分类</span>
      </div>
      <el-form :model="formData" label-position="left" label-width="100px" ref="formName">
        <el-form-item prop="name" label="商品类名称">
          <el-input v-model="formData.name" class="prd-add-input"></el-input>
        </el-form-item>
        <el-form-item prop="order" label="商品类序号">
          <el-input-number v-model="formData.order" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item prop="desc" label="商品类描述">
          <el-input v-model="formData.desc" class="prd-add-input"></el-input>
        </el-form-item>
        <el-form-item class="btn-fa">
          <el-button type="primary" @click="prdAdd" class="prd-btn">确认添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { productClassAdd } from "@/api/productclass.js";
export default {
  data() {
    return {
      // 表单数据
      formData: {
        name: "",
        order: "",
        desc: ""
      }
    };
  },
  methods: {
    // 成功消息弹框
    seccessM(mag) {
      const v = this;
      v.$message({
        message: mag,
        type: "success",
        center: true,
        duration: 1500
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
    // 确认按钮
    prdAdd() {
      productClassAdd(this.formData).then(rsdata => {
        if (rsdata.success) {
          this.seccessM(rsdata.message);
        } else {
          this.failM(rsdata.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.productclassadd-box {
  // 卡片
  .card-box {
    width: 1000px;
    margin: 0 auto;
    padding: 30px 30px 50px;
  }
  // 输入框
  .prd-add-input {
    width: 250px;
  }
  // 确认按钮
  .btn-fa {
    margin-top: 50px;
    padding-left: 150px;
  }
  .prd-btn {
    width: 150px;
  }
}
</style>