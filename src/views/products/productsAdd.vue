<template>
  <div class="product-add-box">
    <!-- 卡片 -->
    <el-card class="card-box">
      <div slot="header" class="clearfix">
        <i class="el-icon-s-shop"></i>
        <span>添加商品</span>
      </div>
      <!-- 表单 -->
      <el-form :model="form" label-width="100px">
        <el-form-item prop="name" label="商品名称" >
          <el-input class="add-input" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="category" label="商品分类">
          <el-select v-model="form.category" placeholder="请选择商品分类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特色">
          <el-checkbox-group v-model="form.feature">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="isPromotion" label="是否促销">
          <el-radio-group v-model="form.isPromotion">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="packingexpense" label="包装费">
          <el-input class="add-input" v-model="form.packingexpense"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="单价">
          <el-input class="add-input" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="商品描述">
          <el-input type="textarea"  class="add-input" :rows="3" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { productAdd} from '@/api/products.js';
export default {
  data() {
    return {
      // 表单数据
      form: {
        name: "",
        category: "",
        feature: [],
        isPromotion: "",
        price: "",
        packingexpense: "",
        desc: ""
      }
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
    // 提交按钮
    onSubmit() {
      const v = this;
      v.form.feature = JSON.stringify(v.form.feature);
      productAdd(v.form).then( rsdata => {
        if(rsdata.success) {
          v.successM(rsdata.message);
        } else {
          v.failM(rsdata.message);
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.product-add-box {
  // 卡片样式
  .box-card {
    padding: 10px 20px 0;
    margin: 0 auto;
  } //清除浮动
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  // 表单
  .add-input {
    width: 300px;
  }
}
</style>