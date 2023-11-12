<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight" style="margin: 16px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>报修信息</el-breadcrumb-item>
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
                <el-button icon="plus" style="width: 50px" type="primary" @click="add"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <!--    表格-->
        <el-table v-loading="loading" :data="tableData" border max-height="705" style="width: 100%">
          <el-table-column label="#" type="index"/>
          <el-table-column :show-overflow-tooltip="true" label="标题" prop="title"/>
          <el-table-column label="宿舍号" prop="dormBuildId" sortable width="150px"/>
          <el-table-column label="房间号" prop="dormRoomId" sortable width="150px"/>
          <el-table-column label="申请人" prop="repairer" width="150px"/>
          <el-table-column
              :filter-method="filterTag"
              :filters="[
              { text: '完成', value: '完成' },
              { text: '未完成', value: '未完成' },
            ]"
              filter-placement="bottom-end"
              label="订单状态"
              prop="state"
              sortable
          >
            <template #default="scope">
              <el-tag
                  :type="scope.row.state === '完成' ? 'success' : 'info'"
                  disable-transitions
              >{{ scope.row.state }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="订单创建时间" prop="orderBuildTime" sortable/>
          <el-table-column label="订单完成时间" prop="orderFinishTime" sortable/>
          <!--      操作栏-->
          <el-table-column label="操作" width="190px">
            <template #default="scope">
              <el-button icon="more-filled" type="default" @click="showDetail(scope.row)"></el-button>
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
              <el-form-item label="标题" prop="title" style="margin-bottom: 27px">
                <el-input v-model="form.title" clearable style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="楼宇号" prop="dormBuildId" style="margin-bottom: 27px">
                <el-input v-model="form.dormBuildId" clearable style="width: 50%"></el-input>
              </el-form-item>
              <el-form-item label="房间号" prop="dormRoomId" style="margin-bottom: 27px">
                <el-input v-model="form.dormRoomId" clearable style="width: 50%"
                ></el-input>
              </el-form-item>
              <el-form-item label="申请人" prop="repairer">
                <el-input v-model="form.repairer" clearable style="width: 50%"></el-input>
              </el-form-item>
              <el-form-item label="内容" prop="content">
                <el-input
                    v-model="form.content"
                    :autosize="{ minRows: 3, maxRows: 10 }"
                    clearable
                    style="width: 80%"
                    type="textarea"
                ></el-input>
              </el-form-item>
              <el-form-item :style="finishTime" label="订单状态" prop="state">
                <el-radio v-model="form.state" label="完成">完成</el-radio>
                <el-radio v-model="form.state" label="未完成">未完成</el-radio>
              </el-form-item>
              <el-form-item label="订单创建时间" prop="orderBuildTime" style="margin-top: 27px">
                <el-date-picker
                    v-model="form.orderBuildTime"
                    :disabled="buildTimeDisabled"
                    clearable
                    placeholder="选择时间"
                    style="width: 48%"
                    type="datetime"
                    value-format="YYYY-MM-DD HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item :style="finishTime" label="订单完成时间" prop="orderFinishTime" style="margin-top: 27px">
                <el-date-picker
                    v-model="form.orderFinishTime"
                    clearable
                    placeholder="选择时间"
                    style="width: 48%"
                    type="datetime"
                    value-format="YYYY-MM-DD HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
              </span>
            </template>
          </el-dialog>
          <!--   内容详情弹窗-->
          <el-dialog v-model="detailDialog" title="详情" width="30%">
            <el-card>
              <div v-html="detail.content"></div>
            </el-card>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="closeDetails">确 定</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script src="@/assets/js/RepairInfo.js"></script>