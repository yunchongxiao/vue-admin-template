<template>
  <!-- 公司详情最外层容器 -->
  <div class="dashboard-editor-container">
    <!-- 公司信息详情卡片最外层容器 -->
    <el-card style="padding: 0 50px" shadow="never">
      <el-descriptions :column="2">
        <!-- 公司名插槽 -->
        <template slot="title">
          <h1 style="display: flex;margin-bottom: 0;">{{ companyDetails.company }}</h1>
        </template>
        <!-- 公司搜索框插槽 -->
        <template slot="extra" style="">
          <el-autocomplete
            v-model="company"
            style="width: 400px"
            :fetch-suggestions="handleQueryCompany"
            placeholder="查询其他企业"
            @select="handleSelectCompany"
          />
          <el-button type="info" @click="queryCompany">查询</el-button>
        </template>
        <el-descriptions-item label="法定代表人"><i class="el-icon-user icon" />{{ companyDetails.representative }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱"><i class="el-icon-message icon" />{{ companyDetails.email }}
        </el-descriptions-item>
        <el-descriptions-item label="电话"><i class="el-icon-phone-outline icon" />{{ companyDetails.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="地址"><i class="el-icon-location-outline icon" />{{ companyDetails.address }}
        </el-descriptions-item>
        <el-descriptions-item label="平台用户">
          <!-- TODO 跳转用户页面 -->
          <router-link to="/" class="link">{{ companyDetails.realname }}</router-link>
        </el-descriptions-item>
        <!-- 在这里可以选择移除或添加黑名单 -->
        <el-descriptions-item label="是否进入失信名单">
          <span v-if="companyDetails.isBreak" style="display: flex;margin-right: 10px;">
            {{ '是' }}<a
              class="remove-blacklist"
              style="margin-left: 10px;"
              @click="addBlacklistDialogVisible=true"
            >移除黑名单</a>
          </span>
          <span v-else style="display: flex">
            {{ '否' }}<a
              class="add-blacklist"
              style="margin-left: 10px;"
              @click="addBlacklistDialogVisible=true"
            >加入黑名单</a>
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="简介" span="2">{{ companyDetails.introduction }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 黑名单添加/删除模态框 TODO 提取组件 -->
    <el-dialog title="添加黑名单" :visible.sync="addBlacklistDialogVisible">
      <el-form ref="addBlacklistForm" :model="companyDetails" label-width="150px" style="width: 95%">
        <el-form-item label="统一社会信用代码">
          <el-input v-model="companyDetails.uscc" disabled />
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="companyDetails.company" disabled />
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input v-model="companyDetails.representative" disabled />
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input v-model="companyDetails.address" disabled />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="companyDetails.phone" disabled />
        </el-form-item>
        <el-form-item label="公司邮箱">
          <el-input v-model="companyDetails.email" disabled />
        </el-form-item>
        <el-form-item label="失信原因">
          <el-input v-model="companyDetails.reason" type="textarea" :disabled="companyDetails.isBreak" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBlacklistDialogVisible = false">
          取消
        </el-button>
        <el-button v-if="!companyDetails.isBreak" type="primary" @click="handleAddBlacklist">添加</el-button>
        <el-button v-else type="danger" @click="handleRemoveBlacklist">移除</el-button>
      </div>
    </el-dialog>

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
import { getCompanyDetails, queryCompany } from '@/api/company'
import { addBlacklist, deleteBlacklist } from '@/api/blacklist'

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
  name: 'CompanyDetails',
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
      addBlacklistDialogVisible: false, // 添加黑名单模态框显示
      lineChartData: lineChartData.newVisitis, // 没研究
      company: '', // 搜索公司的公司名
      cid: '', // 搜索公司的id
      timeout: null, // 定时器
      blacklistForm: {},
      // 公司的详细信息，由公司信息和黑名单表共同组成，也可拆分吧
      companyDetails: {}
    }
  },

  created() {
    const uscc = this.$route.params.uscc
    if (uscc === ':uscc') {
      this.$message({
        type: 'danger',
        message: '请查询一个公司'
      })
    } else {
      getCompanyDetails(uscc)
        .then(({ data }) => {
          this.companyDetails = data
        }).catch(error => {
          this.$message({
            type: 'danger',
            message: '该公司不存在'
          })
          console.log(error)
        })
    }
  },
  methods: {
    generateBlacklistForm() {
      this.blacklistForm = {
        uscc: this.companyDetails.uscc,
        company: this.companyDetails.company,
        representative: this.companyDetails.representative,
        address: this.companyDetails.address,
        phone: this.companyDetails.phone,
        email: this.companyDetails.email,
        reason: this.companyDetails.reason
      }
    },
    handleSelectCompany(item) {
      this.uscc = item.uscc
    },
    queryCompany() {
      this.$router.push(`/company/${this.uscc}`)
    },
    handleAddBlacklist() {
      this.generateBlacklistForm()
      this.$confirm(`是否将${this.companyDetails.company}添加黑名单?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        addBlacklist(this.blacklistForm).then(() => {
          this.$message({
            type: 'success',
            message: '成功添加黑名单'
          })
          this.addBlacklistDialogVisible = false
          location.reload()
        }).catch((error) => {
          this.$message({
            type: 'danger',
            message: error
          })
        })
      })
    },
    handleRemoveBlacklist() {
      this.generateBlacklistForm()
      this.$confirm(`是否将${this.companyDetails.company}移出黑名单?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteBlacklist({ 'bid': this.companyDetails.bid }).then(() => {
          this.$message({
            type: 'success',
            message: '成功移除黑名单'
          })
          location.reload()
        })
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    handleQueryCompany(queryString, callback) {
      if (queryString) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          queryCompany({ company: queryString }).then(({ data }) => {
            console.log(data)
            callback(data)
          }).catch(error => {
            console.log('查询公司后端响应失败')
            console.log(error)
          })
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 10px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .link {
    color: #409eff
  }

  .link:hover {
    color: #66b1ff
  }

  .icon {
    margin-right: 4px;
  }

  .add-blacklist {
    color: #f56c6c;
  }

  .add-blacklist:hover {
    color: #de9696;
  }

  .remove-blacklist {
    color: #4fc08d;
  }

  .remove-blacklist:hover {
    color: #72cda4
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
