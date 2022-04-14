<template>
  <div class="container">
    <div class="safe-banner">
      <div class="safe-score">75</div>
      <div class="safe-score-tips">账号安全评分</div>
    </div>
    <div class="nav-container">
      <ul>
        <li>
          <el-row>
            <el-col :span="10">
              <div class="title"><i class="el-icon-warning" />实名认证</div>
            </el-col>
            <el-col :span="10">
              <div class="description">未完成实名认证</div>
            </el-col>
            <el-col :span="4">
              <div class="link"><a>实名认证</a></div>
            </el-col>
          </el-row>
        </li>
        <el-divider />
        <el-row>
          <el-col :span="10">
            <div class="title"><i class="el-icon-warning" />实名认证</div>
          </el-col>
          <el-col :span="10">
            <div class="description">未完成实名认证</div>
          </el-col>
          <el-col :span="4">
            <div class="link"><a>实名认证</a></div>
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="10">
            <div class="title"><i class="el-icon-warning" />实名认证</div>
          </el-col>
          <el-col :span="10">
            <div class="description">未完成实名认证</div>
          </el-col>
          <el-col :span="4">
            <div class="link"><a>实名认证</a></div>
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="10">
            <div class="title"><i class="el-icon-warning" />实名认证</div>
          </el-col>
          <el-col :span="10">
            <div class="description">未完成实名认证</div>
          </el-col>
          <el-col :span="4">
            <div class="link"><a>实名认证</a></div>
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="10">
            <div class="title"><i class="el-icon-warning" />实名认证</div>
          </el-col>
          <el-col :span="10">
            <div class="description">未完成实名认证</div>
          </el-col>
          <el-col :span="4">
            <div class="link"><a>实名认证</a></div>
          </el-col>
        </el-row>
        <el-divider />
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      qq: '',
      tel: '',
      email: ''
    }
  },
  created() {
    this.$store.dispatch('user/getInfo', this.$store.state.user.token).then(({ data }) => {
      this.qq = data['qq']
      this.tel = data['tel']
      this.email = data['email']
    })
  },
  methods: {}

}
</script>

<style scoped>
.container {
  width: 75%;
  margin: 0 auto;
}

.description {
  color: #5a5e66;
  font-size: small;
}

a {
  font-size: small;
  color: #1482f0;
}

a:hover {
  color: #66b1ff;
}

.el-icon-warning {
  color: #efa957;
}

.el-icon-success {
  color: #48bd86;
}

.safe-banner {
  background: url("https://s1.hdslb.com/bfs/static/security/static/img/logo_normal.79d580e.png");
  position: relative;
  width: 400px;
  height: 220px;
  margin: 0 auto;
}

.safe-score {
  position: relative;
  margin: 0 auto;
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  top: 60px;
}

.safe-score-tips {
  position: absolute;
  font-size: 12px;
  color: #fff;
  left: 165px;
  top: 125px;
}

li{
  list-style: none;
}

</style>
