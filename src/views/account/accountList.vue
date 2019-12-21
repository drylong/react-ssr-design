<template>
  <div class="account-list">
      <!-- 表格 -->
      <div slot="header" class="clearfix">
        <h3>账号列表</h3>
      </div>
      <!-- 内容 -->
      <!-- el-table 属性
          :data ： 接受一个 对象数组 在子元素行el-table-column 中会遍历数组 通过prop来选择遍历的属性 lebel来定义表头
          stripe ： 是否开启斑马色
          border ： 是否加上竖直方向上边框
          width ： 定义列宽度
          :row-class-name="方法名"  给属性的某一行添加class 表示状态 样式加在全局css里
          height="数字"  可以固定表头
          max-height="数字"  超出高度时出现滚动条 并固定表头
         :default-sort = "{prop: 'date', order: 'descending'}" ： 排序
      -->
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%"
        height="400px"
        :default-sort="{prop: 'id', order: 'descending'}"
      >
        <!-- el-table-column 属性
            prop ： 对应列内容的字段名(遍历对象的属性名称)
            label: 显示的标题
            fixed: 固定列  boolean/left/right  开关 左边 右边
        -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="账号">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="角色">
                <span>{{ props.row.role }}</span>
              </el-form-item>
              <el-form-item label="日期">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="住址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
            </el-form>
          </template> :formatter="formatter"
        </el-table-column>
        <el-table-column prop="id" label="编号" width="100" sortable fixed="left"></el-table-column>
        <el-table-column prop="name" label="账号" width="200"></el-table-column>
        <el-table-column prop="role" label="角色" width="200"></el-table-column>
        <el-table-column prop="date" label="日期" width="300"></el-table-column>
        <el-table-column prop="address" label="住址" width="400"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页  -->
      <!-- 
          layout            组件布局，子组件名用逗号分隔
              total ：    表示总条目数，
              size ：     用于设置每页显示的页码数量。
              prev ：     前一页
              pager ：    表示页码列表
              next ：     后一页
              jumper ：   表示跳页元素，
          size-change       数字改变是函数
          current-change    数字改变是函数
          :current-page	    当前显示在第几页 可以加 .sync
          :page-sizes	      接受一个整型数组，数组元素为展示的选择每页显示个数的选项
          :page-size       每页显示条目个数，支持 .sync 修饰符(值必须属于page-sizes数组)
          
          :total          总条目数         
      -->
      <div class="pages">
        <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :total="400"
      ></el-pagination>
      </div>

    <!-- 编辑对话框 -->
    <!-- 
        visible ： 是否默认可见
    -->


<el-dialog title="修改账户" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="账户名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户权限" :label-width="formLabelWidth">
      <el-select v-model="form.role" placeholder="请选择权限">
        <el-option label="超级管理员" value="超级管理员"></el-option>
        <el-option label="普通员工" value="普通员工"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
    
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage4: 1,
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
        },
        {
          id: 4,
          role: "普通员工",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: 4,
          role: "普通员工",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: 4,
          role: "普通员工",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: 4,
          role: "普通员工",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          id: 4,
          role: "普通员工",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      dialogFormVisible : false,
      form: {
          name: '',
          power:''
        },
        formLabelWidth: '100px'
    };
  },
  methods: {
    // 排序里的函数 没搞懂
    // formatter(row, column) {
    //     // return {row.address, column};
    //   },
    // 分页 页码改变
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    },
    // 对话框关闭函数
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then( () => {
            done();
          })
          .catch( () => {});
    },
    handleEdit(index, row) {        //传入data数组中的索引  和  对象
      this.dialogFormVisible = true;
      console.log(index,row)
      this.form = {
          id: 1,
          role: "超级管理员",
          name: "王小虎1",
          date: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄"
        };
    },
    close(index,row) {
      console.log(index,row)
      this.dialogFormVisible = false;
    }
    
  }
};
</script>

<style lang="less" scoped>
.account-list {
  // 表格下面详细信息样式
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  // 分页的样式
  .pages {
    margin-top: 30px;
  }

  
}
</style>