<template>
  <div style="line-height: 50px; display: flex">
    <div
      style="
        width: 200px;
        margin-left: 10px;
        font-weight: bold;
        color: dodgerblue;
      "
    >
      高校宿舍管理系统
    </div>
    <!-- <Clock style="font-size: 20px;position: absolute;left: 50%;overflow: hidden;"/> -->
    <div style="flex: 1"></div>
    <div class="right-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="18" style="float: left; margin-right: 7px"
            ><avatar
          /></el-icon>
          个人中心
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="selfInfoManage"
              >个人信息</el-dropdown-item
            >
            <el-dropdown-item @click="SignOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import Clock from '@/components/Clock'

const { ElMessage } = require('element-plus')

export default {
  name: 'Header',
  components: {
    Clock,
  },
  data() {
    return {
      name: '',
    }
  },
  created() {},
  methods: {
    SignOut() {
      sessionStorage.clear()
      request.get('/main/signOut')
      ElMessage({
        message: '用户退出登录',
        type: 'success',
      })
      this.$router.replace({ path: '/login' })
    },
    selfInfoManage() {
      this.$router.push('/selfInfo')
    },
  },
}
</script>

<style scoped>
.right-info {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5%;
}

.right-info:hover {
  cursor: pointer;
}
</style>
