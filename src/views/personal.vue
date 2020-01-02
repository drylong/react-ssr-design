<template>
  <div class="personal">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-s-custom"></i>
        <span>个人中心</span>
      </div>
      <!-- 信息 -->
      <p><span>用户名：</span>{{data.username}}</p>
      <p><span>密码：</span>{{data.password}}</p>
      <p><span>邮箱：</span>{{data.email | dis}}</p>
      <p>
        <span>头像：</span>
        <el-upload
          class="avatar-uploader"
          :action="uploadAvatar"
          :show-file-list="false"
          :on-success="successed"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" style='border: 1px dashed #409eff'></i>
        </el-upload>
        <el-button type="primary" class="uploadBtn" @click="uploadBtn">确认修改</el-button>
      </p>
    </el-card>
  </div>
</template>

<script>
import { personalInfo, uploadAvatar, uploadAdress, editAvatarImg} from '@/api/'
export default {
  data() {
    return {
      // 图片上传地址
      uploadAvatar: uploadAvatar,
      data:{
        id:'',
        avatar:''
      },
    }
  },
  methods: {
    successed(res) {
      const v = this;
      if(res.success) {
        v.data.avatar = res.fileName;
        // console.log(v.avatar);
      }
    },
    beforeAvatarUpload() {
    },
    // 图片修改按钮
    uploadBtn() {
      const token = localStorage.getItem('token');
      const avatar = this.data.avatar;
      const v = this;
      editAvatarImg({token,avatar}).then( rsdata => {
        if(rsdata.success) {
          v.bus.$emit('editAvatar', v.data.avatar);
        }
      })
    }
  },
  computed:{
    imageUrl() {
      if(this.data.avatar) {
        // console.log(this.data.avatar);
        return uploadAdress + this.data.avatar;
      } else {
        return ''
      }
    }
  },
  created() {
    let token = localStorage.getItem('token');
    const v = this;
    personalInfo({token}).then( rsdata => {
      if ( rsdata.accountInfo) {
        // 使用浅拷贝
         v.data = Object.assign({},rsdata.accountInfo);
      }
    })
  },
  filters: {
    dis(val) {
      if(!val) {
        return '无'
      }
    }
  }
};
</script>

<style lang="less" scoped>
.personal {
  
  // 卡片
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 80%;
    min-width: 480px;
    height: 600px;;
    margin: 0 auto;

    p {
      span {
        display: inline-block;
        width: 100px;
      }
    }
  }
  // 图片
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    margin-top: 30px;
    width: 178px;
    height: 178px;
    display: block;
  }
  .uploadBtn {
    margin: 20px 0 0 100px;
  }
}
</style>