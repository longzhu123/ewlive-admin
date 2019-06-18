<template>

  <div class="main-left">
    <div class="logo"/>
    <el-menu
      router
      unique-opened
      class="main-left-menu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/dashboard"> <i class="iconfont icon-home"></i><span>首页</span></el-menu-item>
      <el-submenu index="/system">
        <template slot="title">
          <i class="iconfont icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/sysUser"><i class="iconfont icon-user"></i> <span>用户管理</span></el-menu-item>
          <el-menu-item index="/system/sysRole"><i class="iconfont icon-switchuser"></i> <span>角色管理</span></el-menu-item>
          <el-menu-item index="/system/sysMenu"><i class="iconfont icon-menu"></i> <span>菜单管理</span></el-menu-item>
          <el-menu-item index="/system/sysDic"><i class="iconfont icon-book"></i> <span>字典管理</span></el-menu-item>
          <el-menu-item index="/system/crud"><i class="iconfont icon-book"></i> <span>通用crud</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/monitor">
        <template slot="title">
          <i class="iconfont icon-alert"></i>
          <span>系统监控</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/monitor/logOperate"><i class="iconfont icon-solution"></i> <span>操作日志</span></el-menu-item>
          <el-menu-item index="/monitor/logError"><i class="iconfont icon-file-exception"></i> <span>异常日志</span></el-menu-item>
          <el-menu-item index="/monitor/logLogin"><i class="iconfont icon-filedone"></i> <span>登录日志</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'LeftBar',
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .main-left {
    width: 210px;
    background-color: rgb(84, 92, 100);
    .main-left-menu {
      width: 100%;
      border: none;
    }

    .logo {
      padding: 20px;
      height: 40px;
      background: #606266 url("../../../assets/logo.png") no-repeat center center;
      background-size: 30%;
    }
  }
</style>
