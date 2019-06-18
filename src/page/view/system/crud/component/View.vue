<template>
  <el-dialog
    title="查看详情"
    :visible="viewDialogVisible"
    width="50%"
    :center="true"
    @close="viewDialogClose"
  >
    <el-form>
      <table id="viewTable">
        <tr>
          <td class="viewKey">用户名</td>
          <td class="viewVal">{{viewForm.username}}</td>
          <td class="viewKey">密码</td>
          <td class="viewVal">{{viewForm.password}}</td>
        </tr>
        <tr>
          <td class="viewKey">年龄</td>
          <td class="viewVal">{{viewForm.age}}</td>
          <td class="viewKey">出生日期</td>
          <td class="viewVal">{{viewForm.borth}}</td>
        </tr>
        <tr>
          <td class="viewKey">学历</td>
          <td class="viewVal" colspan="3">{{viewForm.edu}}</td>
        </tr>
        <tr>
          <td class="viewKey">附件</td>
          <td class="viewVal" colspan="3">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="viewForm.aboutFile"
              multiple>
            </el-upload>
          </td>
        </tr>
        <tr>
          <td class="viewKey">备注</td>
          <td class="viewVal" colspan="3">1</td>
        </tr>
      </table>


    </el-form>

    <span slot="footer" class="dialog-footer"></span>
  </el-dialog>
</template>

<script>
  export default {
    name: "ViewDetail",
    props: ["viewDialogVisible", "viewForm"],
    data() {
      return {};
    },
    //页面加载方法
    mounted() {
    },
    methods: {
      viewDialogClose() {
        this.$emit("closeViewDialog", false);
      }
    }
  }
</script>

<style scoped>
  #viewTable {
    width: 100%;
  }

  .viewKey {
    height: 30px;
    width: 15%;
    text-align: center;
  }

  .viewVal {
    height: 30px;
    width: 40%;
    text-align: left;
  }

  #viewTable tr {
    height: 60px;
  }
</style>
