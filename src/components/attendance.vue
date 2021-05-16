<template>
  <div class="body">
    <!-- 每日打卡按钮 -->
    <div v-if="!beginAttendance" class="daka">
      <el-button type="primary" @click="attendanceStart()" circle
        ><span>开始今日打卡</span></el-button
      >
    </div>
    <!-- 如果已经按过按钮，显示今日打卡详情 -->
    <div v-if="beginAttendance" class="dakaxiangqing">
      <!-- 打卡进度 -->
      <el-progress
        type="circle"
        v-if="completeRate != 100"
        :percentage="completeRate"
      ></el-progress>
      <!-- 打卡进度100%时，进度条切换成success进度条 -->
      <el-progress
        type="circle"
        v-else
        :percentage="100"
        status="success"
      ></el-progress>
      <!-- 打卡主体区域 -->
      <el-card class="box-card">
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="beginTime" label="开始时间" width="180">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="180">
            </el-table-column>
            <el-table-column prop="work" label="工作" width="180">
            </el-table-column>
            <el-table-column prop="id" label="状态">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  round
                  v-if="!scope.row.status"
                  @click="changeStatus(scope.row.id)"
                  >打卡</el-button
                >
                <img v-if="scope.row.status" src="../assets/对号.png" />
                <el-button
                  class="quxiaodaka"
                  type="primary"
                  round
                  v-if="scope.row.status"
                  @click="changeStatus(scope.row.id)"
                  >取消打卡</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: null,
      completeRate: 0,
      beginAttendance: false,
    };
  },
  mounted: function () {
    this.getNowPlan();
    this.getCompleteRate();
    this.judgeAttendance();
  },
  methods: {
    async getNowPlan() {
      const result = await this.$http.get("/plan/getNowPlan");
      this.tableData = result.data.data.plans;
    },
    async changeStatus(id) {
      const result = await this.$http.get(`/plan/changeStatus/${id}`);
      this.getNowPlan();
      this.completeRate = result.data.data.rate;
    },
    async getCompleteRate() {
      const result = await this.$http.get("/plan/getCompleteRate");
      this.completeRate = result.data.data.rate;
    },
    async judgeAttendance() {
      const result = await this.$http.get("/attendance/judgeAttendance");
      this.beginAttendance = result.data.data.judge;
    },
    async attendanceStart() {
      await this.$http.post("/attendance/beginAttendance", {
        rate: 0,
        time: new Date(),
      });
      this.judgeAttendance();
      this.getNowPlan();
      this.getCompleteRate();
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  height: 100%;
}
.dakaxiangqing {
  height: 100%;
}
.daka {
  height: 100%;
  .el-button {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
    span {
      font-size: 20px;
    }
  }
}
.el-progress {
  position: fixed !important;
  top: 50%;
  left: 10%;
  transform: translate(-50%, -50%);
}
.box-card {
  position: absolute;
  top: 20%;
  width: 60%;
  left: 50%;
  transform: translateX(-50%);
}
img {
  width: 35px;
  height: 35px;
}
.quxiaodaka {
  position: relative;
  left: 100px;
  bottom: 5px;
}
</style>