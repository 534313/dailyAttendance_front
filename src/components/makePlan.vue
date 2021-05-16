<template>
  <div class="body">
    <el-card class="box-card">
      <el-form
        v-for="(plan, index) in plans"
        v-bind:key="index"
        :model="plan"
        size="small"
        label-width="100px"
        class="demo-dynamic"
        :inline="true"
      >
        <el-form-item label="开始时间:">
          <el-time-picker
            value-format="hh:mm:ss"
            v-model="plan.beginTime"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-time-picker
            value-format="hh:mm:ss"
            v-model="plan.endTime"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="工作:">
          <el-input v-model="plan.work"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="delectPlan(index, plan.beginTime)"
          round
          >删除计划</el-button
        >
        <el-button size="mini" @click="addPlan(index)" type="primary" round
          >添加先前计划</el-button
        >
      </el-form>
      <el-button @click="addPlan(plans.length)" type="primary" round
        >添加此后计划</el-button
      >
      <el-button @click="makePlan" type="primary" round>制定计划</el-button>
    </el-card>
    <!-- 确认计划对话框 -->
    <el-dialog title="明日计划如下" :visible.sync="dialogTableVisible">
      <el-table :data="plans">
        <el-table-column property="beginTime" label="开始时间" width="150">
        </el-table-column>
        <el-table-column
          property="endTime"
          label="结束时间"
          width="150"
        ></el-table-column>
        <el-table-column
          property="work"
          label="工作"
          width="150"
        ></el-table-column>
      </el-table>
      <el-button @click="makeSure" type="primary" round>确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plans: [
        {
          beginTime: new Date(2016, 9, 10, 18, 40),
          endTime: new Date(2016, 9, 10, 18, 40),
          work: "",
        },
      ],
      dialogTableVisible: false,
    };
  },
  mounted: function () {
    this.getNowPlan();
  },
  methods: {
    addPlan(index) {
      this.plans.splice(index, 0, {
        beginTime: new Date(),
        endTime: new Date(),
        work: "",
      });
    },
    delectPlan(index, time) {
      this.plans.splice(index, 1);
      console.log(time);
    },
    async getNowPlan() {
      const result = await this.$http.get("/plan/getFuturePlan");
      this.plans = result.data.data.plans;
    },
    makePlan() {
      this.dialogTableVisible = true;
      console.log(this.plans);
    },
    async makeSure() {
      await this.$http.put("/plan/makePlan", this.plans);
      this.dialogTableVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  height: 100%;
}
.box-card {
  position: absolute;
  top: 20%;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  .el-time-picker {
    width: 100px !important;
  }
  .el-button {
    margin-top: 0;
    margin-left: 20px;
  }
}
.el-button {
  margin-top: 20px;
}
</style>