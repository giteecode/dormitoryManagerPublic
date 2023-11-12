<template>
  <el-menu
      :default-active="this.path"
      router
      style="width: 200px; height:100%; min-height: calc(100vh - 40px)"
      unique-opened
  >
    <div style="display: flex;align-items: center;justify-content: center;padding: 11px 0;">
      <img alt="" src="@/assets/logo.png" style="width: 60px;">
    </div>
    <el-menu-item index="/home">
      <el-icon>
        <house/>
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu v-if="this.judgeIdentity()!==0" index="2">
      <template #title>
        <el-icon>
          <user/>
        </el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item v-if="this.judgeIdentity()!==0" index="/stuInfo">学生信息</el-menu-item>
      <el-menu-item v-if="this.judgeIdentity()===2" index="/dormManagerInfo">宿管信息</el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-if="this.judgeIdentity()!==0" index="3">
      <template #title>
        <el-icon>
          <coin/>
        </el-icon>
        <span>宿舍管理</span>
      </template>
      <el-menu-item v-if="this.judgeIdentity()!==0" index="/buildingInfo">楼宇信息</el-menu-item>
      <el-menu-item v-if="this.judgeIdentity()!==0" index="/roomInfo">房间信息</el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-if="this.judgeIdentity()!==0" index="4">
      <template #title>
        <el-icon>
          <message/>
        </el-icon>
        <span>信息管理</span>
      </template>
      <el-menu-item v-if="this.judgeIdentity()===2" index="/noticeInfo">公告信息</el-menu-item>
      <el-menu-item v-if="this.judgeIdentity()!==0" index="/repairInfo">报修信息</el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-if="this.judgeIdentity()!==0" index="5">
      <template #title>
        <el-icon>
          <pie-chart/>
        </el-icon>
        <span>申请管理</span>
      </template>
      <el-menu-item v-if="this.judgeIdentity()!==0" index="/adjustRoomInfo">调宿申请</el-menu-item>
    </el-sub-menu>
    <el-menu-item v-if="this.judgeIdentity()!==0" index="/visitorInfo">
      <svg class="icon" data-v-042ca774="" style="height: 18px; margin-right: 11px;"
           viewBox="0 0 1024 1024"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 110 448 224 224 0 010-448zm0 64a160.192 160.192 0 00-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
            fill="currentColor"></path>
      </svg>
      <span>访客管理</span>
    </el-menu-item>
    <el-menu-item v-if="this.judgeIdentity()===0" index="/myRoomInfo">
      <el-icon>
        <school/>
      </el-icon>
      <span>我的宿舍</span>
    </el-menu-item>
    <el-menu-item v-if="this.judgeIdentity()===0" index="/applyChangeRoom">
      <el-icon>
        <takeaway-box/>
      </el-icon>
      <span>申请调宿</span>
    </el-menu-item>
    <el-menu-item v-if="this.judgeIdentity()===0" index="/applyRepairInfo">
      <el-icon>
        <set-up/>
      </el-icon>
      <span>报修申请</span>
    </el-menu-item>
    <el-sub-menu v-if="this.judgeIdentity()!==1" index="7">
      <template #title>
        <el-icon>
          <set-up/>
        </el-icon>
        <span>水电费管理</span>
      </template>
      <el-menu-item v-if="this.judgeIdentity()!==1" index="/WaterInfo">水费管理</el-menu-item>
      <el-menu-item v-if="this.judgeIdentity()!==1" index="/ElectricInfo">电费管理</el-menu-item>
    </el-sub-menu>
  <el-menu-item index="/CheckInfo">
      <el-icon>
        <tickets/>
      </el-icon>
      <span>卫生检查</span>
    </el-menu-item>
    <el-menu-item index="/selfInfo">
      <el-icon>
        <setting/>
      </el-icon>
      <span>个人信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import request from "@/utils/request";
import {ElMessage} from "element-plus";

export default {
  name: "Aside",
  data() {
    return {
      user: {},
      identity: '',
      path: this.$route.path
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      request.get("/main/loadIdentity").then((res) => {
        if (res.code !== "0") {
          ElMessage({
            message: '用户会话过期',
            type: 'error',
          });
          sessionStorage.clear()
          request.get("/main/signOut");

        }
        window.sessionStorage.setItem("identity", JSON.stringify(res.data));
        this.identity = res.data
      });
      request.get("/main/loadUserInfo").then((result) => {
        if (result.code !== "0") {
          ElMessage({
            message: '用户会话过期',
            type: 'error',
          });
          request.get("/main/signOut");
          sessionStorage.clear()
          this.$router.replace({path: "/login"});
        }
        window.sessionStorage.setItem("user", JSON.stringify(result.data));
        this.user = result.data
      });
    },
    judgeIdentity() {
      if (this.identity === 'stu') {
        return 0
      } else if (this.identity === 'dormManager') {
        return 1
      } else
        return 2
    }
  },
}
</script>

<style scoped>
.icon {
  margin-right: 6px;
}

.el-sub-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 199px;
}
</style>