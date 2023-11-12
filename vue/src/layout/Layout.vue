<template>
  <el-container>
    <!--    侧边功能栏-->
    <el-aside width="200px">
      <Aside/>
    </el-aside>
    <el-container>
      <!--      头部-->
      <el-header style="height: 50px;border-bottom: 1px solid #ccc;">
        <Header/>
      </el-header>
      <el-main style="padding: 0;">
        <!--        内容区域-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";

const {ElMessage} = require("element-plus");

export default {
  name: "layout",
  components: {
    Header,
    Aside,
  },
}
</script>

<style scoped>

</style>