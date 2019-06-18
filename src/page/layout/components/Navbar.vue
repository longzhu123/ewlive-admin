<template>
  <div class="header-nav">
    <div class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner"><img src="../../../assets/headPic.jpg"/>admin</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .header-nav {
    flex: 1;
    height: 60px;
    line-height: 60px;
    background: rgb(84, 92, 100);
    color:#fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
    }

    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
</style>
