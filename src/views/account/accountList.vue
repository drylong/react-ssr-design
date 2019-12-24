<template>
  <div class="account-list">
    <!-- 卡片 -->
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>
          <i class="el-icon-s-custom"></i>账户列表
        </span>
      </div>
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchModel" class="demo-form-inline">
        <el-form-item label="搜索用户名：">
          <el-input v-model="searchModel.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="搜索权限：">
          <el-select v-model="searchModel.role" placeholder="用户权限">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" class="search-btn" >查询  <i class="el-icon-search"></i></el-button>
          <el-button type="primary" @click="onReset" class="search-btn" >重置  <i class="el-icon-refresh"></i></el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" height="450">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="权限" :formatter="formatterRole"></el-table-column>
        <el-table-column prop="inputtime" label="录入日期"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete( scope.row)">删除</el-button>
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
      <!-- 对话框 修改 -->
      <el-dialog title="修改账户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名：" :label-width="formLabelWidth"  >
            <el-input v-model="form.username" autocomplete="off" class="el-dialog-input"></el-input>
          </el-form-item>
          <el-form-item label="权限：" :label-width="formLabelWidth">
            <el-select v-model="form.role" placeholder="请选择权限" class="el-dialog-input">
              <el-option label="超级管理员" :value="1"></el-option>
              <el-option label="普通员工" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="goEdit">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { accountList, accountEdit, accountDel, accountSearch, accountPage } from "@/api/account.js";
export default {
  data() {
    return {
      // 搜索表单数据
      search:{
        username:'',
        role:''
      },
      searchModel:{
        username:'',
        role:''
      },
      // 表格数据
      tableData: [
        {
          id: 1,
          role: "超级管理员",
          username: "王小虎1",
          inputtime: "2016-05-02",
          email: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          role: "普通员工",
          inputtime: "2016-05-04",
          username: "王小虎2",
          email: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      // 对话框数据
      form: {
        username: "",
        role: "",
        id: ""
      },
      //  分页数据
      pages: {
        total: 5,
        currentPage: 1,
        pageSize: 5,
        username: '',
        role: '',
      },
      // 弹出框数据
      dialogFormVisible: false,
      formLabelWidth: "100px"
    };
  },
  methods: {
    // 获取列表函数
    getList() {
      const v = this;
      accountList().then(rsdata => {
        v.tableData = rsdata;
      });
    },
    //分页发请求函数
    getPage() {
      const v = this;
      accountPage(v.pages).then( rsdata => {
        v.pages.total = rsdata.total;
        v.tableData = rsdata.data;
      });
    },
    // 搜索按钮
    onSearch() {
      const v = this;
      v.search = Object.assign({},this.searchModel);
      accountSearch(v.search).then(rsdata => {
        // v.tableData = Object.assign( {} , rsdata);
        // 控制分页算法
        console.log(v.pages.pageSize,v.pages.currentPage);
         v.pages.currentPage = 1;  //当前页 
        let s = v.pages.pageSize ;    //每页个数
        v.tableData = rsdata.slice(0,s);
        v.pages.total = rsdata.length;
      })
    },
    // 重置 按钮
    onReset() {
      console.log(this.pages.pageSize,this.pages.currentPage);
      this.pages.currentPage = 1 ;
      this.search = {username:'' ,role: ''};
      this.searchModel = {username:'' ,role: ''};
    },
    // 修改权限显示
    formatterRole(row) {
      if (row.role === 1) {
        return "超级管理员";
      } else {
        return "普通员工";
      }
    },
    // 编辑按钮函数
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      // 数据回填 注意
      this.form = Object.assign({}, row); //浅拷贝
      // this.form.username = row.username;
      // this.form.role = row.role;
      // this.form = row;      错误
      // 发送请求
    },
    //页内数量大小改变 函数
    sizeChange(val) {
      const v= this;
      v.pages.pageSize = val;
      this.getPage();
    },
    // 当前页码改变 函数
    currentChange(val) {
      const v = this;
      // console.log(v.search.username,v.search.role);
      if(v.search.username || v.search.role) {
        if(v.search.username || v.search.role) {
          accountSearch(v.search).then(rsdata => {
          // v.tableData = Object.assign( {} , rsdata);
          console.log(val);
          let p = v.pages.pageSize;
          v.tableData = rsdata.slice((val-1)*p,val*p);
          rsdata;
      })
        }
      } else {
        v.pages.currentPage = val;
        this.getPage();
      }
    },
    // 弹出框确认修改
    goEdit() {
      const v = this;
      accountEdit(v.form).then(rsdata => {
        if (rsdata.success) {
          v.getList();
        }
        alert(rsdata.message);
        v.dialogFormVisible = false;
      });
    },
    // 删除按钮函数
    handleDelete(row) {
      accountDel({ id: row.id }).then(rsdata => {
        if (rsdata.success) {
          this.getPage();
        }
        alert(rsdata.message);
      });
    }
  },
  created() {
    // this.getList();
    const v = this;
    accountPage(v.pages).then(rsdata => {
      v.pages.total = rsdata.total;
      v.tableData = rsdata.data;
    })
  }
};
</script>

<style lang="less" scoped>
.account-list {
  // 卡片样式
  .box-card {
    width: 1200px;
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
  // 搜索按钮 
  .search-btn {
    width: 120px;
  }
  //分页 样式
  .fen-page {
    margin-top: 20px;
  }
  // 弹出框input宽度
  .el-dialog-input {
    width: 300px;
  }
  .el-dialog-form {
    text-align: center;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>