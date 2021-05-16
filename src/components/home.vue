<template>
  <div class="body">
    <div class="leijidaka">
      <span>已经打卡了{{ attendance }}天</span>
    </div>
    <div class="xianzaishijian">
      <span>今天是：{{ systemTime }}</span>
    </div>
    <!-- <div class="dakaanniu">
      <el-button type="primary" round>主要按钮</el-button>
    </div> -->
    <el-button type="primary" circle @click="goToAttendance">
      <span>打卡</span>
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attendance: 0,
      systemTime: "",
    };
  },
  mounted: function () {
    //自动触发写入的函数
    this.getDataNum();
    this.addDate();
  },
  methods: {
    async getDataNum() {
      const result = await this.$http.post("attendance/getNum");
      console.log(result);
      const data = result.data.data;
      this.attendance = data.num;
      return;
    },

    addDate() {
      let nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      };
      this.systemTime =
        date.year + " 年 " + date.month + " 月 " + date.date + " 日";
    },
    goToAttendance() {
      this.$router.push("/attendance");
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  height: 100%;
}
.leijidaka {
  display: inline;
  position: absolute;
  font-size: 20px;
  height: 60px;
  width: 400px;
  left: 5%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 1px 1px 3px 3px #0c0c0c4d; /*上边阴影 */
  top: 20%;
  opacity: 0;
  animation-name: divCartoon;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
.xianzaishijian {
  display: inline;
  position: absolute;
  font-size: 20px;
  height: 60px;
  width: 400px;
  right: 5%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 1px 1px 3px 3px #0c0c0c4d; /*上边阴影 */
  top: 40%;
  opacity: 0;
  animation-name: divCartoon;
  animation-duration: 2s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
}
.el-button {
  position: absolute;
  top: 70%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 0px;
  height: 0px;
  opacity: 0;
  border-radius: 100%;
  span {
    position: absolute;
    opacity: 0;
    width: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation-name: buttonSpanCartoon;
    animation-duration: 1s;
    animation-delay: 3s;
    animation-fill-mode: forwards;
  }
  animation-name: buttonCartoon;
  animation-duration: 1s;
  animation-delay: 2s;
  animation-fill-mode: forwards;
}
@keyframes divCartoon {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes buttonCartoon {
  0% {
    opacity: 1;
    width: 0px;
    height: 0px;
  }
  100% {
    opacity: 1;
    width: 100px;
    height: 100px;
  }
}
@keyframes buttonSpanCartoon {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
span {
  position: absolute;
  width: 80%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>