<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight" style="margin: 16px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>水电费管理</el-breadcrumb-item>
      <el-breadcrumb-item>水费管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin: 15px; min-height: calc(100vh - 111px)">
      <div>
        <!--    功能区-->
        <div style="margin: 10px 0">
          <!--    搜索区-->
          <div style="margin: 10px 0">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <el-button
              icon="Search"
              style="margin-left: 5px"
              type="primary"
              @click="load"
            ></el-button>
            <el-button
              icon="refresh-left"
              style="margin-left: 10px"
              type="default"
              @click="reset"
            ></el-button>
            <div style="float: right">
              <el-tooltip content="添加" placement="top">
                <el-button
                  icon="plus"
                  style="width: 50px"
                  type="primary"
                  @click="add"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <!--    表格-->
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          max-height="705"
          style="width: 100%"
        >
          <el-table-column label="#" type="index" />
          <el-table-column label="操作类型" prop="type" />
          <el-table-column label="金额" prop="money" />
          <el-table-column label="操作人" prop="operatorName" sortable />
          <el-table-column label="日期" prop="date" sortable />
          <!--      操作栏-->
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                icon="more-filled"
                type="default"
                @click="handleEdit(scope.row)"
              ></el-button>
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
          <el-dialog
            v-model="dialogVisible"
            :title="title"
            width="30%"
            @close="cancel"
          >
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="类型" prop="type">
                <el-input
                  v-model="form.type"
                  disabled
                  clearable
                  style="width: 80%"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="宿舍号"
                v-if="role != 'stu' || disabled"
                prop="roomid"
              >
                <el-input
                  v-model="form.roomid"
                  :disabled="disabled"
                  clearable
                  style="width: 80%"
                ></el-input>
              </el-form-item>
              <el-form-item label="金额" prop="money">
                <el-input-number
                  :disabled="disabled"
                  v-model="form.money"
                  style="width: 80%"
                  :precision="2"
                  :step="0.1"
                  :min="1"
                  :max="1000"
                ></el-input-number>
              </el-form-item>

              <el-form-item label="操作人" v-if="disabled" prop="operatorName">
                <el-input
                  v-model="form.operatorName"
                  disabled
                  clearable
                  style="width: 80%"
                ></el-input>
              </el-form-item>
              <el-form-item v-if="disabled" label="操作时间">
                <el-date-picker
                  disabled
                  v-model="form.date"
                  type="date"
                  placeholder="选择日期"
                  style="width: 80%"
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
            <span v-if="!disabled" style="color: red"
              >**注意：请按照线下缴费，线上办理的方式进行</span
            >
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="!disabled" type="primary" @click="save"
                  >确 定</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script src="@/assets/js/WaterInfo.js"></script>