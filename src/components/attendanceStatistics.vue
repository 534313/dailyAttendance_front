<template>
  <div class="body">
    <el-card
      ><template>
        <el-table :lazy="true" :data="tableData" stripe style="width: 100%">
          <el-table-column prop="time" label="日期" width="300">
            <template slot-scope="scope">
              {{ scope.row.time | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column prop="rate" label="打卡完成率" width="300">
            <template slot-scope="scope">
              <el-progress
                :text-inside="true"
                :stroke-width="24"
                v-if="scope.row.rate != 100"
                :percentage="scope.row.rate"
              ></el-progress>
              <el-progress
                v-else
                :text-inside="true"
                :stroke-width="24"
                :percentage="100"
                status="success"
              ></el-progress>
            </template>
          </el-table-column>
        </el-table> </template
    ></el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: null,
    };
  },
  mounted: function () {
    this.getAttendances();
  },
  methods: {
    async getAttendances() {
      const result = await this.$http.get("/attendance/getAllAttendances");
      this.tableData = result.data.data.attendances;
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  height: 100%;
}
.el-card {
  position: absolute;
  top: 20%;
  width: 60%;
  left: 50%;
  transform: translateX(-50%);
}
</style>