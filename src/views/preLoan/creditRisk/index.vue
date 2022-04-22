<template>
  <div class="creditrisk-container">
    <!-- 筛选表头，输入信息之后，异步向后台发送查询信息 -->
    <el-row gutter="10" type="flex" justify="center">
      <!--  选择企业名称 -->
      <el-col :span="4"><el-input v-model="listQuery.company" placeholder="企业名称" @keyup.enter.native="handleFilter" /></el-col>
      <!-- 选择评估模型 -->
      <el-col :span="4">
        <el-select v-model="listQuery.model" placeholder="评估模型" clearable>
          <el-option v-for="item in modelOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
      <!-- 选择流程状态 -->
      <el-col :span="4">
        <el-select v-model="listQuery.status" placeholder="评估状态" clearable>
          <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-col>
      <el-col :span="2"><el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button></el-col>
      <el-col :span="2"><el-button type="primary" icon="el-icon-edit">添加</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="listLoading" :data="list" fit empty-text="暂无数据">
      <el-table-column type="index" width="50" :index="indexMethod" align="center" />
      <el-table-column label="企业名称" min-width="200" prop="company" align="center" />
      <el-table-column label="模型名称" width="120" prop="model" align="center" />
      <el-table-column label="评估状态" width="120" prop="status" align="center" />
      <el-table-column label="评估风险" width="80" prop="risk" align="center" />
      <el-table-column label="评估时间" width="210" prop="updateTime" align="center" :formatter="updateTimeFormatter" />
      <el-table-column label="评估用时" width="140" prop="duration" align="center" :formatter="durationFormatter" />
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template v-slot="{row}">
          <el-button size="mini" type="primary" @click="handleModifyStatus(row,'published')">重评</el-button>
          <el-button size="mini" @click="handleModifyStatus(row,'draft')">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Type" prop="type" />
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchCreditriskList, deleteCreditrisk } from '@/api/creditrisk'
import { parseTimestamp } from '@/utils' // secondary package based on el-pagination

export default {
  name: 'Creditrisk',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 10,
        status: undefined,
        company: undefined,
        model: undefined,
        sort: '+id'
      },
      modelOptions: [],
      statusOptions: [],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    durationFormatter(row) {
      const duration = row.duration
      const hour = duration / 3600
      const second = (duration % 3600) / 3600
      return `${hour}h${second}m`
    },

    updateTimeFormatter(row) {
      return parseTimestamp(row.updateTime)
    },

    indexMethod(index) {
      return (this.listQuery.current - 1) * this.listQuery.size + index + 1
    },
    handleDelete(row) {
      this.$confirm(`确定删除本条 ${row.company} 的信用风险评估结果？`, '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        deleteCreditrisk(row).then(() => {
          this.getList()
        })
      })
    },
    getList() {
      this.listLoading = true
      fetchCreditriskList(this.listQuery).then(({ data }) => {
        console.log(data)
        this.list = data.page.records
        this.total = data.page.total
        this.modelOptions = data.allModel
        this.statusOptions = data.allStatus
      })
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

<style>

.creditrisk-container {
margin: 10px
}
</style>
