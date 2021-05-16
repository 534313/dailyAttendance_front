<template>
  <div class="body">
    <el-container>
      <el-header class="head">
        <div class="titleInHeader">每日打卡</div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
        >
          <el-menu-item index="home">Home</el-menu-item>
          <el-menu-item index="attendance">打卡</el-menu-item>
          <el-menu-item index="makePlan">制定计划</el-menu-item>
          <el-menu-item index="attendanceStatistics">打卡统计</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="main" style="padding: 0px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "home",
    };
  },
  methods: {
    async getDataNum() {
      const result = await this.$http.post("attendance/getNum");
      console.log(result);
      const data = result.data.data;
      this.attendance = data.num;
      return;
    },
    handleSelect() {
      console.log(this.activeIndex);
      // this.$router.push();
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
html {
  height: 100%;
}
.body {
  font-family: YouYuan;
  // background: url("../assets/background.png") no-repeat;
  font-weight: 800;
  height: 100%;
}
.head {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 20%;
  background-color: rgb(255, 255, 255);
  border-bottom: 0.3px solid rgba(153, 153, 153, 0.493);
  .titleInHeader {
    position: absolute;
    left: 3%;
    top: 50%;
    transform: translateY(-50%);
  }
  .el-menu-demo {
    position: absolute;
    right: 10%;
  }
}
</style>