<template>
  <div class="productclass-box">
    <!-- 卡片 -->
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>
          <i class="el-icon-tickets"></i>商品分类列表
        </span>
      </div>
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="pages" class="demo-form-inline">
        <el-form-item label="搜索商品分类名：">
          <el-input v-model="pages.name" placeholder="商品分类" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" class="search-btn" >查询  <i class="el-icon-search"></i></el-button>
          <el-button type="primary" @click="onReset" class="search-btn" >重置  <i class="el-icon-refresh"></i></el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" height="450">
        <el-table-column prop="id" label="商品类编号" width="180"></el-table-column>
        <el-table-column prop="name" label="商品类名" width="180"></el-table-column>
        <el-table-column prop="order" label="商品类序号"></el-table-column>
        <el-table-column prop="desc" label="商品类描述"></el-table-column>
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
      <el-dialog title="商品分类修改" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="100px" :rules="rules" ref="form">
          <el-form-item label="商品类名" prop="name" autocomplete="off">
            <el-input v-model="form.name" class="el-dialog-input"></el-input>
          </el-form-item>
          <el-form-item label="商品类序号"  autocomplete="off">
            <el-input-number v-model="form.order" :min="1" class="el-dialog-input"></el-input-number>
          </el-form-item>
          <el-form-item label="商品类描述"  autocomplete="off">
            <el-input type="textarea" :rows="2" placeholder="请输入商品类型描述" v-model="form.desc" class="el-dialog-input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formCancel">取 消</el-button>
          <el-button type="primary" @click="formTrue('form')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { productClassList, productClassEdit,productClassDel ,productClassPage} from "@/api/productclass.js";
export default {
  data() {
    return {
      // 表格数据
      tableData: [
        {
          id: "",
          name: "",
          order: "",
          desc: ""
        }
      ],
      // 对话框
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        order: "",
        desc: ""
      },
      // 验证表单
      rules:{
        name:[
          {required: true, message: '请输入用户姓名', trigger: 'blur'}
        ]
      },
      //  分页数据
      pages: {
        total: 0,
        currentPage: 1,
        pageSize: 5,
        name: '',
      },
    };
  },
  methods: {
    // 获取列表请求
    getList() {
      const v = this;
      productClassList().then(rsdata => {
        v.tableData = rsdata;
      });
    },
    // 发送分页请求 基于当前值
    getPage() {
      const v = this;
      productClassPage(this.pages).then(rsdata => {
        if(rsdata) {
          console.log(rsdata.total);
          v.pages.total = rsdata.total;
          v.tableData = rsdata.data;
        }
      })
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
    // 搜索按钮
    onSearch() {
      console.log(this.pages);
      this.getPage();
    },
    // 重置 按钮
    onReset() {
      this.pages.name = '';
      this.getPage;
    },
    // 表格编辑按钮
    handEdit(row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({},row);
      row;
    },
    // 表格删除按钮
    handDel(row) {
      const v = this;
      console.log(row)
      productClassDel(row).then( rsdata => {
        if(rsdata.success) {
          v.successM(rsdata.message);
          v.getList();
        } else {
          v.failM(rsdata.message);
        }
      })
      v;
      row;
    },
    // 对话框确定按钮
    formTrue(form) {
      const v = this;
      this.$refs[form].validate( valid => {
        if(valid) {
          // 发送修改请求
          productClassEdit(v.form).then( rsdata => {
            if(rsdata.success) {
              v.seccessM(rsdata.message);
            } else {
              v.failM(rsdata.message);
            }
          });
          //发送获取列表请求
          this.getList();
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      })
    },
    // 对话框取消按钮
    formCancel() {
      this.dialogFormVisible = false;
    },
    // 页面数量大小改变
    sizeChange (val) {
      this.pages.pageSize = val;
      this.getPage();
    },
    // 当前页码改变
    currentChange (val) {
      this.pages.currentPage = val;
      this.getPage();
    },
  },
  created() {
    // 获取列表函数
    this.getPage();
  }
};
</script>

<style lang='less' scoped>
/* @import "../../assets/style/css/common.css" */
.productclass-box {
  .el-dialog-input {
    width: 300px;
  }
  // 搜索按钮 
  .search-btn {
    width: 120px;
  }
  //分页 样式
  .fen-page {
    margin-top: 20px;
  }
}
</style>