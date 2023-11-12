<template>
  <el-container>
    <span>{{ dateFormat(date) }}</span>
  </el-container>
</template>

<script>
//创建一个函数来增加月日时小于10在前面加0
const padaDate = function (value) {
  return value < 10 ? '0' + value : value;
};
export default {
  name: 'clock',
  data() {
    return {
      // 当前时间
      date: new Date()
    }
  },
// 挂载时间
  mounted() {
    //获取当前日期
    let that = this;
    this.timer = setInterval(function () {
      that.date = new Date().toLocaleString();
    });
  },
  methods: {
    //当前日期格式化
    dateFormat() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ?
          '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    }
  }
}
</script>