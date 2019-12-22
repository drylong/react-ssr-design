<template>
  <div class="account-list">
    <!-- 卡片组件 -->
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>账号列表</h3>
      </div>
      <!-- 内容 -->
      <!-- 
          data ： 动态数据
          stripe ： 是否开启各行换色
      -->
      <el-table :data="tableData" stripe style="width: 100%" :default-sort="{prop: 'id', order: 'descending'}">
        <!-- 
            prop ： 对应列内容的字段名(遍历对象的属性名称)
            label: 显示的标题
            width: 对应列的宽度
        -->
        <el-table-column prop="id" label="编号" sortable fixed="left"></el-table-column>
        <el-table-column prop="name" label="账号"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页  -->
      <div class="footer">
        <!-- 
            current-page	当前页数
            page-sizes	    每页显示个数选择器的选项设置
            page-size       每页显示条目个数(值必须属于page-sizes)
            layout          
        -->
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="450"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>

    <!-- 编辑对话框 -->
    <!-- 
        visible ： 是否默认可见
    -->
    <el-dialog title="账号修改" :visible.sync="dialogFormVisible">
      <el-form
        
        status-icon
        :rules="rules"
        ref="addAcountForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" >
          <el-input v-model="addAcountForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" >
          <el-select v-model="addAcountForm.role" placeholder="请选择">
            <!-- 
              label ： 下拉框显示的值
              value ： 下拉框传递的值
            -->
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通员工" value="普通员工"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="make">确 定</el-button>
        <el-button @click="qu">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false, // 对话框默认不可见
      addAcountForm: {
        name: "",
        role: ""
      },
      aa: {
        name: "",
        role: ""
      },
      rules: {},
      currentPage: 1,
      tableData: [
        {
          id: 1,
          role: "超级管理员",
          name: "王小虎1",
          date: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          role: "普通员工",
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          role: "普通员工",
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          id: 4,
          role: "普通员工",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    // 编辑 按钮
    handleEdit(i, row) {
      // 修改对话框的显示状态为true，即显示对话框
      this.dialogFormVisible = true;
      Object.freeze(row);
      this.addAcountForm = row;
      this.aa.name = row.name;
      // 点击编辑按钮时，把当行前的数据，更新到form对于的model对象上
    },
    make() {
      this.dialogFormVisible = false;
    },
    qu() {
      this.addAcountForm.name = this.aa.name;
      this.dialogFormVisible = false;
    },
    // 删除 按钮
    handleDelete(row) {
      // 筛选id符合的对象
      let index = this.tableData.indexOf( this.tableData.filter( (item) => item.id === row.id
      )[0]);
      this.tableData.splice(index,1);
    }
  }
};
</script>

<style lang="less" scoped>
.account-list {
  .footer {
    margin-top: 10px;
  }

  .el-dialog {
    .el-form {
      width: 500px;
    }
  }
}
</style>