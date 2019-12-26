<template>
  <div class="product-box">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-s-shop"></i>
        <span>商品列表</span>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline label-width="100px" class="demo-table-expand">
              <el-form-item label="编号：">
                <span>{{props.row.id}}</span>
              </el-form-item>
              <el-form-item label="商品名称：">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="商品分类：">{{props.row.category}}</el-form-item>
              <el-form-item label="特色：">{{props.row.feature | fa}}</el-form-item>
              <el-form-item label="是否促销：">{{props.row.isPromotion}}</el-form-item>
              <el-form-item label="单价：">{{props.row.price}}</el-form-item>
              <el-form-item label="包装费：">{{props.row.packingexpense}}</el-form-item>
              <el-form-item label="商品描述：">{{props.row.desc}}</el-form-item>
              <el-form-item label="录入时间：">{{props.row.inputtime}}</el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="商品名"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="inputtime" label="录入日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pages.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size='pages.pageSize'
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total" 
        class='fen-page'>
      </el-pagination>
      <!-- 对话框 -->
      <el-dialog title="收货地址" :visible.sync="visible">
        <!-- 表单 -->
        <el-form :model="diaForm" label-width="100px" >
          <el-form-item prop="name" label="商品名称">
            <el-input class="add-input" v-model="diaForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="category" label="商品分类">
            <el-select v-model="diaForm.category" placeholder="请选择商品分类">
              <!-- <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option> -->
              <el-option v-for="val in categoryArr" :key="val.id" :label="val.name" :value='val.name'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="特色">
            <el-checkbox-group v-model="diaForm.feature">
              <el-checkbox label="源自四川" name="feature"></el-checkbox>
              <el-checkbox label="火爆产品" name="feature"></el-checkbox>
              <el-checkbox label="祖传手艺" name="feature"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="feature"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="isPromotion" label="是否促销">
            <el-radio-group v-model="diaForm.isPromotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="packingexpense" label="包装费">
            <el-input class="add-input" v-model="diaForm.packingexpense"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="单价">
            <el-input class="add-input" v-model="diaForm.price"></el-input>
          </el-form-item>
          <el-form-item prop="desc" label="商品描述">
            <el-input type="textarea" class="add-input" :rows="3" v-model="diaForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="diaCancel">取消</el-button>
          <el-button type="primary" @click="diaDefine">确认修改</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { productList ,productEdit ,productDel} from "@/api/products.js";
export default {
  data() {
    return {
      // 表格数据
      tableData: [
        {
          id: "",
          name: "",
          category: "",
          feature: "",
          isPromotion: "",
          price: "",
          packingexpense: "",
          desc: "",
          inputtime: ""
        }
      ],
      // 对话框
      visible: false,
      diaForm: {
        name: "",
        category: "",
        feature: [],
        isPromotion: "",
        price: "",
        packingexpense: "",
        desc: ""
      },
      //  分页数据
      pages: {
        total: 5,
        currentPage: 1,
        pageSize: 5,
        username: '',
        role: '',
      },
    };
  },
  methods: {
    // 获取列表请求
    getList() {
      const v = this;
      productList().then(rsdata => {
        v.tableData = rsdata;
        v.categoryArr = rsdata;
      });
    },
    // 发分页请求 基于当前页
    getPage() {
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
    // 编辑按钮
    handEdit(row) {
      this.visible = true;
      // this.diaForm = Object.assign({},row);
      // this.diaForm.feature = JSON.parse(this.diaForm.feature);
      const feature = JSON.parse(row.feature)

      this.diaForm = Object.assign({},row,{feature})
    },
    // 删除按钮
    handDel(row) {
      const v = this;
      let { id } = row;
      productDel({id}).then( rsdata => {
        if(rsdata.success) {
          v.successM(rsdata.message);
          v.getList();
        } else {
          v.failM(rsdata.message);
        }
      })
    },
    // 对话框取消按钮
    diaCancel() {
      this.visible = false;
    },
    // 对话框确定按钮
    diaDefine() {
      const v = this;
      this.diaForm.feature = JSON.stringify(this.diaForm.feature);
      productEdit(this.diaForm).then( rsdata => {
        if( rsdata.success) {
          v.successM(rsdata.message);
          v.getList();
        } else {
          v.failM(rsdata.message);
        }
      })
      console.log(v.diaForm);
      this.visible = false;
    }
  },
  //过滤器
  filters: {
    fa(value) {
      if (value) {
        return JSON.parse(value).join();
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.product-box {
  // 卡片标题
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  // 表格展开框
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  //分页 样式
  .fen-page {
    margin-top: 20px;
  }
  // 表单
  .add-input {
    width: 300px;
  }
}
</style>