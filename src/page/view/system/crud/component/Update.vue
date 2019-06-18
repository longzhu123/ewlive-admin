<template>
  <el-dialog
    title="修改"
    :visible="updateDialogVisible"
    width="50%"
    :center="true"
    @close="updateDialogClose"
  >
    <el-form :model="updateForm" :rules="editRules" ref="updateForm">
      <table id="updateTable">
        <tr>
          <td>
            <el-form-item label="用户名" label-width="80px" prop="username">
              <el-input v-model="updateForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="密码" label-width="80px" prop="password">
              <el-input v-model="updateForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="年龄" label-width="80px" prop="age">
              <el-input type="number" v-model.number="updateForm.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="出生日期" label-width="80px" prop="borth">
              <el-date-picker type="date" placeholder="选择出生日期" v-model="updateForm.borth"
                              style="width: 100%"></el-date-picker>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="学历" label-width="80px" prop="edu">
              <el-select v-model="updateForm.edu" filterable placeholder="请选择学历" style="width: 100%">
                <el-option
                  v-for="item in eduList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="附件" label-width="80px" prop="aboutFile" ref="updateAboutFile">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="updateAboutFileSuccess"
                :on-remove="updateAboutFileRemove"
                :file-list="updateForm.aboutFile"
                multiple>
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-form-item label="备注" label-width="80px" prop="comment">
              <el-input type="textarea" :autosize="{minRows:5}" v-model="updateForm.comment"
                        placeholder="请输入备注"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateDialog">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('updateForm')">保 存</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import * as StringConstants from "../constants/StringConstants";

  export default {
    name: 'Update',
    props: ["updateDialogVisible", "eduList", "editRules", "updateObj"],
    data() {
      return {
        updateForm: this.updateObj
      }
    },
    //页面加载方法
    mounted() {
    },
    watch: {
      updateObj: function (newVal,oldVal) {
        this.updateForm = newVal;
        //如果附件对象没有,默认给一个空的
        if(this.updateForm.aboutFile === undefined){
          this.updateForm.aboutFile = [];
        }
      }
    },
    methods: {
      //监听修改表单Dialog关闭event
      updateDialogClose() {
        this.$refs["updateForm"].resetFields();
        this.$emit("closeUpdateDialog", false);
      },
      //编辑表单提交事件
      submitEditForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("update");
            console.log(_this.updateForm);
          } else {
            return false;
          }
        });
      },
      //关闭修改模态事件
      closeUpdateDialog() {
        //调用父组件的closeUpdateDialog属性方法
        this.$emit("closeUpdateDialog", false);
      },
      //修改附件对象上传成功callback
      updateAboutFileSuccess(res, file) {
        this.updateForm.aboutFile.push(file);
        this.$refs.updateAboutFile.clearValidate();
      },
      //修改附件对象删除成功callback  file:当前删除的附件对象  fileList:删除后剩余的附件集合
      updateAboutFileRemove(file, fileList) {
        this.updateForm.aboutFile = fileList;
      }
    }
  }
</script>

<style scoped>
  #updateTable {
    width: 100%;
  }
</style>
