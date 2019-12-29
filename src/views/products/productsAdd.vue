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
        <el-form-item prop="name" label="商品名称">
          <el-input class="add-input" v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="category" label="商品分类">
          <el-select v-model="form.category" placeholder="请选择商品分类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item prop="category" label="商品分类">
            <el-select v-model="form.category" placeholder="请选择商品分类">
            
              <el-option
                v-for="val in classForm"
                :key="val.id"
                :label="val"
                :value="val"
              ></el-option>
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
        <el-form-item label="上传图片：">
          <el-upload
            class="avatar-uploader"
            :action="updataQ"
            :show-file-list="false"
            :on-success="successed"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" style='border: 1px dashed #409eff'></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="desc" label="商品描述">
          <el-input type="textarea" class="add-input" :rows="3" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="qu">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { productAdd ,updataQ, updataS } from "@/api/products.js";
import { productClassList} from "@/api/productclass.js";

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
        desc: "",
        imgUrl: ""
      },
      // 商品的类型
      classForm: [],
      // 头像地址
      updataQ: updataQ,
    };
  },
  methods: {
    // 获取列表请求
    getList() {
      const v = this;
      productClassList().then(rsdata => {
        let s = new Set(rsdata.map( item => item.name));
        v.classForm = [...s];
      });
    },
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
      productAdd(v.form).then(rsdata => {
        if (rsdata.success) {
          v.successM(rsdata.message);
        } else {
          v.failM(rsdata.message);
        }
      });
    },
    // 取消按钮
    qu(){
      this.form.name = "",
      this.form.category = "",
      this.form.feature = [],
      this.form.isPromotion = "",
      this.form.price = "",
      this.form.packingexpense = "",
      this.form.desc = "",
      this.form.imgUrl = ""
    },
    successed(res) {
      // 表格里imgurl变成上传到后台的图片的名字
      this.form.imgUrl = res.fileName;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  // 计算属性
  computed: {
    imageUrl(){
      if(this.form.imgUrl) {
        return updataS + this.form.imgUrl;
      } else {
        return '';
      }
    }
  },
  created() {
    this.getList();
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
  // 头像上传
  // .avatar-uploader .el-upload {
  //   border: 1px dashed #d9d9d9!important;
  //   border-radius: 6px;
  //   cursor: pointer;
  //   position: relative;
  //   overflow: hidden;
  // }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>