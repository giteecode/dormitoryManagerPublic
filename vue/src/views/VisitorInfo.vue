<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight" style="margin: 16px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>访客管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin: 15px; min-height: calc(100vh - 111px)">
      <div>
        <!--    功能区-->
        <div style="margin: 10px 0">
          <!--    搜索区-->
          <div style="margin: 10px 0">
            <el-input v-model="search" clearable placeholder="请输入标题" prefix-icon="Search" style="width: 20%"/>
            <el-button icon="Search" style="margin-left: 5px" type="primary" @click="load"></el-button>
            <el-button icon="refresh-left" style="margin-left: 10px" type="default" @click="reset"></el-button>
            <div style="float: right">
              <el-tooltip content="添加" placement="top">
                <el-button icon="plus" style="width: 50px" type="primary" @click="add"></el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <!--    表格-->
        <el-table v-loading="loading" :data="tableData" border max-height="705" style="width: 100%">
          <el-table-column label="#" type="index"/>
          <el-table-column label="姓名" prop="visitorName" width="150px"/>
          <el-table-column
              :filter-method="filterTag"
              :filters="[
              { text: '男', value: '男' },
              { text: '女', value: '女' },
            ]"
              filter-placement="bottom-end"
              label="性别"
              prop="gender"
              width="130px"
          />
          <el-table-column label="手机号" prop="phoneNum" width="200px"/>
          <el-table-column label="来源地" prop="originCity" sortable width="140px"/>
          <el-table-column label="来访时间" prop="visitTime" sortable width="220px"/>
          <el-table-column label="备注" prop="content" sortable/>
          <!--      操作栏-->
          <el-table-column label="操作" width="130px">
            <template #default="scope">
              <el-button icon="Edit" type="primary" @click="handleEdit(scope.row)"></el-button>
              <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row.id)">
                <template #reference>
                  <el-button icon="Delete" type="danger"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div style="margin: 10px 0">
          <el-pagination
              v-model:currentPage="currentPage"
              :page-size="pageSize"
              :page-sizes="[10, 20]"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
        <!--      弹窗-->
        <div>
          <el-dialog v-model="dialogVisible" title="操作" width="30%" @close="cancel">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
              <el-form-item label="姓名" prop="visitorName">
                <el-input v-model="form.visitorName" clearable style="width: 50%"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio v-model="form.gender" label="男">男</el-radio>
                <el-radio v-model="form.gender" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="手机号" prop="phoneNum">
                <el-input v-model="form.phoneNum" clearable style="width: 50%"></el-input>
              </el-form-item>
              <el-form-item label="来源地" prop="originCity">
                <el-input v-model="form.originCity" clearable style="width: 50%"></el-input>
              </el-form-item>
              <el-form-item label="来访时间" prop="visitTime">
                <el-date-picker
                    v-model="form.visitTime"
                    clearable
                    placeholder="选择时间"
                    style="width: 48%"
                    type="datetime"
                    value-format="YYYY-MM-DD HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="来访信息" prop="content">
                <el-input
                    v-model="form.content"
                    :autosize="{ minRows: 3, maxRows: 10 }"
                    clearable
                    style="width: 80%"
                    type="textarea"
                ></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script src="@/assets/js/VisitorInfo.js"></script>