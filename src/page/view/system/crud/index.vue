<template>
  <div id="table-container">
    <!--表格搜索工具栏-->
    <div id="searchBar">
      <el-form :model="searchForm" :inline="true" ref="searchForm">
        <el-form-item prop="name" label="姓名">
          <el-input placeholder="请输入姓名" v-model="searchForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="昵称">
          <el-input placeholder="请输入昵称" v-model="searchForm.nickName" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="playState" label="开播状态">
          <el-select v-model="searchForm.playState" filterable placeholder="请选择开播状态" size="small" class="selectEduMain">
            <el-option
              v-for="item in commonSelectList.playStateList"
              :key="item.dicItemCode"
              :label="item.dicItemName"
              :value="item.dicItemCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开播时间">
          <el-form-item prop="beginBorth">
            <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.beginBorth" size="small"
                            :picker-options="beginBorthBefore"></el-date-picker>
          </el-form-item>
          <span>-&nbsp;</span>
          <el-form-item prop="endBorth">
            <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.endBorth" size="small"
                            :picker-options="endBorthAfter"></el-date-picker>
          </el-form-item>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-refresh" @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格操作工具栏-->
    <div id="tableOperaBar">
      <el-button type="success" size="small" icon="el-icon-plus" @click="addDialogVisible=true">添加</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="batchDelete">删除</el-button>
    </div>
    <el-table
      :data="tableData"
      height="620"
      tooltip-effect="dark"
      border
      style="width: 100%;"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="playStateDesc"
        label="开播状态"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="playTime"
        label="开播时间"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="el-icon-view"
            type="primary"
            @click="handleView(scope.row)">查看
          </el-button>
          <el-button
            size="small"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableCurrent"
        :page-sizes="[10, 15, 20, 30,50]"
        :page-size="tableCurrentSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotalSize">
      </el-pagination>
    </div>

    <!--添加模态框-->
    <div id="addDialog">
    </div>

    <!--查看详情模态框-->
    <div id="viewDetailDialog">
    </div>
    <!--修改模态框-->
    <div id="updateDialog">
    </div>

  </div>
</template>

<script>
  import * as StringConstants from "../../../../constants/StringConstants";
  import request from '@/utils/request';
  import util from '@/utils/util';

  export default {
    name: 'crud',
    data() {
      return {
        tableData: [],//表格数据对象
        tableCurrent: 1,//表格当前页
        tableCurrentSize: 10,//表格当前显示的记录数
        tableTotalSize: 0,//表格的总记录数
        tableSelection: [],//表格被选中的对象
        searchForm: {//搜索参数对象
        },
        commonSelectList: {  //公用的下拉框
          playStateList: []
        },
        //搜索栏中的开始时间日期范围过滤
        beginBorthBefore: {
          disabledDate: (time) => {
            let beginDateVal = this.searchForm.endBorth;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        //搜索栏中的结束时间日期范围过滤
        endBorthAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.searchForm.beginBorth;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        }
      }
    },
    mounted() {
      let defaultParams = {
        current: StringConstants.DEFAULT_PAGE_CURRENT,
        size: StringConstants.PAGE_SIZE
      };
      this.getDataList(defaultParams);
      this.loadSelectList();
    },
    methods: {
      //分页组件Size改变event
      handleSizeChange(val) {
        this.tableCurrentSize = val;
        this.tableCurrent = 1;
        this.searchForm.current = this.tableCurrent;
        this.searchForm.size = this.tableCurrentSize;
        let searchParams = this.searchForm;
        this.getDataList(searchParams);
      },
      //当前current改变event
      handleCurrentChange(val) {
        this.tableCurrent = val;
        this.searchForm.current = this.tableCurrent;
        this.searchForm.size = this.tableCurrentSize;
        let searchParams = this.searchForm;
        this.getDataList(searchParams);
      },
      search() {
        this.tableCurrent = 1;
        let searchForm = this.searchForm;
        let pageOptions = {
          current: this.tableCurrent,
          size: this.tableCurrentSize,
        };
        //搜索参数对象合并
        let searchOptions = Object.assign(searchForm, pageOptions);
        request({
          url: process.env.BASE_API + "/sysTest/likeSearchSysTestByPage",
          method: 'post',
          data: searchOptions
        }).then((resp) => {
            let handleData = resp.data;
            this.tableData = handleData.records;
            this.tableCurrent = handleData.current;
            this.tableTotalSize = handleData.total;
        });
      },
      /**
       * 分页获取数据列表
       * @param params 过滤参数对象
       */
      getDataList(params) {
        let _this = this;
        request({
          url: process.env.BASE_API + "/sysTest/likeSearchSysTestByPage",
          method: 'post',
          data: params
        }).then((resp) => {
          let handleData = resp.data;
          _this.tableData = handleData.records;
          _this.tableCurrent = handleData.current;
          _this.tableTotalSize = handleData.total;
        }).catch(() => {
        })
      },
      //表格Checkbox选择事件
      handleSelectionChange(val) {
        this.tableSelection = val;
      },
      batchDelete() {
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          let selectObj = this.tableSelection;
          let ids = util.convertArrayToFiledList(selectObj, "id");
          if (ids === undefined || ids === null || ids.length === 0) {
            this.$message({
              type: 'error',
              message: '请勾选记录,再删除!'
            });
            return;
          }
          request({
            url: process.env.BASE_API + "/sysTest/deleteBatchSysTestByIds",
            method: 'post',
            data: { "ids": ids}
          }).then((resp) => {

              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              let loadDataOptions = {
                current: this.tableCurrent,
                size: this.tableCurrentSize,
              };
              let searchOptions = Object.assign(loadDataOptions, this.searchForm);
              this.getDataList(searchOptions);
          });
        });
      },
      //重置搜索表单click事件
      resetForm(formName) {
        this.$refs[formName].resetFields();
        let defaultParams = {
          current: this.tableCurrent,
          size: this.tableCurrentSize,
        };
        this.getDataList(defaultParams);
      },
      //加载公用的下拉框
      loadSelectList() {
        let _this = this;
        //加载开播状态下拉框
        request({
          url: process.env.BASE_API + "/sysDicItem/getSysDicItemByParams",
          method: 'post',
          data: {dicId: "4783fd16d2bc4015be3f35e60f970c87"}
        }).then((resp) => {
          _this.commonSelectList.playStateList = resp.data;
        });
      }
    }
  }
</script>

<style scoped>
  #table-container {
    width: 90%;
    padding-top: 40px;
    box-sizing: border-box;
    margin: 0 auto;
  }

  .block {
    text-align: right;
  }

  #tableOperaBar {
    margin-bottom: 20px;
  }
</style>
