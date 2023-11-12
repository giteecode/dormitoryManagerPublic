<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight" style="margin: 16px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>宿舍管理</el-breadcrumb-item>
      <el-breadcrumb-item>房间信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin: 15px; min-height: calc(100vh - 111px)">
      <div>
        <!--    功能区-->
        <div style="margin: 10px 0">
          <!--    搜索区-->
          <div style="margin: 10px 0">
            <el-input v-model="search" clearable placeholder="请输入房间号" prefix-icon="Search" style="width: 20%"/>
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
          <!-- 床位展开-->
          <el-table-column type="expand">
            <template #default="props">
              <el-form inline label-position="left">
                <el-form-item label="一号床位" class="item">
                  <template #default="scope">
                    <el-tag v-if="props.row.firstBed != null" disable-transitions type="primary"
                    >{{ props.row.firstBed }}
                    </el-tag>
                    <div class="el-form--inline-icon">
                      <el-icon v-if="props.row.firstBed == null" @click="plusIcon(1, props.row)">
                        <plus/>
                      </el-icon>
                      <div v-if="props.row.firstBed != null" class="el-form--inline-icon">
                        <el-icon @click="detailIcon(1, props.row)">
                          <more-filled/>
                        </el-icon>
                        <el-icon @click="editIcon(1, props.row)">
                          <edit/>
                        </el-icon>
                        <el-popconfirm title="确认删除？" @confirm="deleteStuBed(1, props.row)">
                          <template #reference>
                            <el-icon>
                              <delete/>
                            </el-icon>
                          </template>
                        </el-popconfirm>
                      </div>
                    </div>
                  </template>
                </el-form-item>
                <el-form-item label="二号床位" class="item">
                  <template #default="scope">
                    <el-tag v-if="props.row.secondBed != null" disable-transitions type="primary"
                    >{{ props.row.secondBed }}
                    </el-tag>
                    <div class="el-form--inline-icon">
                      <el-icon v-if="props.row.secondBed == null" @click="plusIcon(2, props.row)">
                        <plus/>
                      </el-icon>
                      <div v-if="props.row.secondBed != null" class="el-form--inline-icon">
                        <el-icon @click="detailIcon(2, props.row)">
                          <more-filled/>
                        </el-icon>
                        <el-icon @click="editIcon(2, props.row)">
                          <edit/>
                        </el-icon>
                        <el-popconfirm title="确认删除？" @confirm="deleteStuBed(2, props.row)">
                          <template #reference>
                            <el-icon>
                              <delete/>
                            </el-icon>
                          </template>
                        </el-popconfirm>
                      </div>
                    </div>
                  </template>
                </el-form-item>
                <el-form-item label="三号床位" class="item">
                  <template #default="scope">
                    <el-tag v-if="props.row.thirdBed != null" disable-transitions type="primary"
                    >{{ props.row.thirdBed }}
                    </el-tag>
                    <div class="el-form--inline-icon">
                      <el-icon v-if="props.row.thirdBed == null" @click="plusIcon(3, props.row)">
                        <plus/>
                      </el-icon>
                      <div v-if="props.row.thirdBed != null" class="el-form--inline-icon">
                        <el-icon @click="detailIcon(3, props.row)">
                          <more-filled/>
                        </el-icon>
                        <el-icon @click="editIcon(3, props.row)">
                          <edit/>
                        </el-icon>
                        <el-popconfirm title="确认删除？" @confirm="deleteStuBed(3, props.row)">
                          <template #reference>
                            <el-icon>
                              <delete/>
                            </el-icon>
                          </template>
                        </el-popconfirm>
                      </div>
                    </div>
                  </template>
                </el-form-item>
                <el-form-item label="四号床位" class="item">
                  <template #default="scope">
                    <el-tag v-if="props.row.fourthBed != null" disable-transitions type="primary"
                    >{{ props.row.fourthBed }}
                    </el-tag>
                    <div class="el-form--inline-icon">
                      <el-icon v-if="props.row.fourthBed == null" @click="plusIcon(4, props.row)">
                        <plus/>
                      </el-icon>
                      <div v-if="props.row.fourthBed != null" class="el-form--inline-icon">
                        <el-icon @click="detailIcon(4, props.row)">
                          <more-filled/>
                        </el-icon>
                        <el-icon @click="editIcon(4, props.row)">
                          <edit/>
                        </el-icon>
                        <el-popconfirm title="确认删除？" @confirm="deleteStuBed(4, props.row)">
                          <template #reference>
                            <el-icon>
                              <delete/>
                            </el-icon>
                          </template>
                        </el-popconfirm>
                      </div>
                    </div>
                  </template>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="房间号" prop="dormRoomId" sortable/>
          <el-table-column label="楼栋号" prop="dormBuildId" sortable/>
          <el-table-column label="楼层" prop="floorNum" sortable/>
          <el-table-column label="最多可住人数" prop="maxCapacity"/>
          <el-table-column
              :filter-method="filterTag"
              :filters="[
              { text: 0, value: 0 },
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 },
              { text: 4, value: 4 },
            ]"
              filter-placement="bottom-end"
              label="已住人数"
              prop="currentCapacity"
              sortable
          />
          <!--      操作栏-->
          <el-table-column label="操作" width="130px">
            <template #default="scope">
              <el-button icon="Edit" type="primary" @click="handleEdit(scope.row)"
              ></el-button>
              <el-popconfirm title="确认删除？" @confirm="handleDelete(scope.row.dormRoomId)">
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
              <el-form-item label="楼栋号" prop="dormBuildId">
                <el-input v-model.number="form.dormBuildId" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="楼层数" prop="floorNum">
                <el-input v-model.number="form.floorNum" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="房间号" prop="dormRoomId">
                <el-input v-model.number="form.dormRoomId" :disabled="disabled" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="最多可住人数" prop="maxCapacity">
                <el-input v-model.number="form.maxCapacity" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="已住人数" prop="currentCapacity">
                <el-input v-model.number="form.currentCapacity" style="width: 80%"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 床位 弹窗-->
          <el-dialog v-model="bedDialog" title="操作" width="30%" @close="cancel">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
              <el-form-item label="楼栋号" prop="dormBuildId">
                <el-input v-model.number="form.dormBuildId" disabled="true" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="楼层数" prop="floorNum">
                <el-input v-model.number="form.floorNum" disabled="true" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item label="房间号" prop="dormRoomId">
                <el-input v-model.number="form.dormRoomId" disabled="true" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item v-if="this.bedNum === 1" label="床位(一)" prop="firstBed">
                <el-input v-model.number="form.firstBed" placeholder="请输入学号" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item v-if="this.bedNum === 2" label="床位(二)" prop="secondBed">
                <el-input v-model.number="form.secondBed" placeholder="请输入学号" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item v-if="this.bedNum === 3" label="床位(三)" prop="thirdBed">
                <el-input v-model.number="form.thirdBed" placeholder="请输入学号" style="width: 80%"></el-input>
              </el-form-item>
              <el-form-item v-if="this.bedNum === 4" label="床位(四)" prop="fourthBed">
                <el-input v-model.number="form.fourthBed" placeholder="请输入学号" style="width: 80%"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="this.judge === false" type="primary" @click="addStuBed">确 定</el-button>
                <el-button v-if="this.judge === true" type="primary" @click="editStuBed">确 定</el-button>
              </span>
            </template>
          </el-dialog>
          <!-- 学生信息弹窗-->
          <el-dialog v-model="stuInfoDialog" title="学生信息" width="20%" @close="cancel">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="学号：" prop="username">
                <template #default="scope">
                  <span>{{ form.username }}</span>
                </template>
              </el-form-item>
              <el-form-item label="姓名：" prop="name">
                <template #default="scope">
                  <span>{{ form.name }}</span>
                </template>
              </el-form-item>
              <el-form-item label="年龄：" prop="age">
                <template #default="scope">
                  <span>{{ form.age }}</span>
                </template>
              </el-form-item>
              <el-form-item label="性别：" prop="gender">
                <template #default="scope">
                  <span>{{ form.gender }}</span>
                </template>
              </el-form-item>
              <el-form-item label="手机号：" prop="phoneNum">
                <template #default="scope">
                  <span>{{ form.phoneNum }}</span>
                </template>
              </el-form-item>
              <el-form-item label="邮箱地址：" prop="email">
                <template #default="scope">
                  <span>{{ form.email }}</span>
                </template>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script src="@/assets/js/RoomInfo.js"></script>
<style scoped>@import '../assets/css/RoomInfo.css';</style>