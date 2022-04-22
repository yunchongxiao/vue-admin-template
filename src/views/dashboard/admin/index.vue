<template>
  <div class="dashboard-editor-container">
    <div class="search-container">
      <el-tabs type="card">
        <el-tab-pane label="查找企业">
          <el-autocomplete
            v-model="company"
            style="width: 400px;margin-right: 5px"
            :fetch-suggestions="handleQueryCompany"
            placeholder="请输入企业名"
            @select="handleSelectCompany"
          />
          <el-button type="primary" @click="queryCompany">查找</el-button>
        </el-tab-pane>
        <el-tab-pane label="查找用户">
          <el-autocomplete
            v-model="username"
            style="width: 400px;margin-right: 5px"
            :fetch-suggestions="handleQueryUser"
            placeholder="请输入用户名"
            @select="handleSelectUser"
          />
          <el-button type="primary" @click="queryUser">查找</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-card class="box-card" shadow="never" style="text-align: center">
      <el-row><span style="color: #909399">累计借贷金额</span></el-row>
      <el-row><span style="font-size: xxx-large; color: #4fc08d">60.18</span>亿元</el-row>
      <el-row type="flex" justify="center">
        <el-col>
          <el-row>
            <svg-icon class="show-icon" icon-class="dash-user" />
          </el-row>
          <el-row style="color: #909399;font-size: small">累计借贷交易</el-row>
          <el-row style="font-size: large;color:#4fc08d">114514笔</el-row>
        </el-col>
        <el-col>
          <el-row>
            <svg-icon class="show-icon" icon-class="dash-time" /></el-row>
          <el-row style="color: #909399;font-size: small">平台运行时间</el-row>
          <el-row style="font-size: large;color:#4fc08d">114514天</el-row>
        </el-col>
        <el-col>
          <el-row>
            <svg-icon class="show-icon" icon-class="dash-money" /></el-row>
          <el-row style="color: #909399;font-size: small">累计企业用户</el-row>
          <el-row style="font-size: large;color:#4fc08d">114514家</el-row>
        </el-col>
      </el-row>
    </el-card>

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { queryCompany } from '@/api/company'
import { queryUser } from '@/api/user'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      company: '',
      username: '',
      uscc: '',
      uid: '',
      timeout: null
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    handleQueryCompany(queryString, callback) {
      if (queryString) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          queryCompany({ company: queryString }).then(({ data }) => {
            callback(data)
          }).catch(error => {
            console.log('查询公司后端响应失败')
            console.log(error)
          })
        }, 1000)
      }
    },
    handleQueryUser(queryString, callback) {
      this.uid = ''
      if (queryString) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          queryUser({ user: queryString }).then(({ data }) => {
            callback(data)
          }).catch(error => {
            console.log('查询用户后端响应失败')
            console.log(error)
          })
        }, 1000)
      }
    },
    handleSelectCompany(item) {
      this.uscc = item.uscc
    },
    handleSelectUser(item) {
      this.uid = item.uid
    },
    queryCompany() {
      this.$router.push(`/company/${this.uscc}`)
    },
    queryUser() {
      this.$router.push(`/user/${this.uid}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.search-container {
  overflow: hidden;
  display: flex;
  justify-content: center;
  background: #fff;
  padding: 5px;
}

.show-icon {
    width: 8em;
    height: 8em;
    padding: 0;
    overflow: hidden;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
