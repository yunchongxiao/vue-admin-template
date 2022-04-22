<template>
  <div class="blacklist-container">
    <el-row gutter="10" type="flex" justify="center">
      <!-- 输入信息之后，异步向后台发送查询信息  -->
      <el-col :span="4"><el-input v-model="listQuery.company" placeholder="企业名称" @keyup.enter.native="handleFilter" /></el-col>
      <el-col :span="3"><el-input v-model="listQuery.representative" placeholder="法定代表人" @keyup.enter.native="handleFilter" /></el-col>
      <el-col :span="4"><el-input v-model="listQuery.phone" placeholder="手机" @keyup.enter.native="handleFilter" /></el-col>
      <el-col :span="4"><el-input v-model="listQuery.email" placeholder="邮箱" @keyup.enter.native="handleFilter" /></el-col>
      <el-col :span="4"><el-input v-model="listQuery.address" placeholder="地址" @keyup.enter.native="handleFilter" /></el-col>
      <el-col :span="2"><el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button></el-col>
      <el-col :span="2"><el-button v-waves type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button></el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="tableData" empty-text="暂无数据">
      <el-table-column type="index" :index="indexMethod" align="center" width="50" />
      <el-table-column type="expand" width="20">
        <template v-slot="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="统一社会信用代码" prop="uscc">
              <span>{{ props.row.uscc }}</span>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-link type="primary" :href="`/#/company/${props.row.uscc}`">{{ props.row.company }}</el-link>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="法定代表人">
              <span>{{ props.row.representative }}</span>
            </el-form-item>
            <el-form-item label="手机">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="失信原因">
              <span>{{ props.row.reason }}</span>
            </el-form-item>
            <el-form-item label="失信日期">
              <span>{{ props.row.breakTime }}</span>
            </el-form-item>
            <el-form-item label="移除黑名单">
              <el-button
                size="mini"
                type="danger"
                @click="removeBlacklist(props.row.bid, props.row.company)"
              >删除
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="企业名称" prop="company" />
      <el-table-column label="法定代表人" prop="representative" width="100px" />
      <el-table-column label="手机" prop="phone" width="110px" />
      <el-table-column label="邮箱" prop="email" width="250px" />
      <el-table-column label="地址" prop="address" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.current"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
    <!-- TODO 这里可以提取组件 -->
    <el-dialog title="添加黑名单" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="blacklistRules" :model="temp" label-width="150px" style="width: 95%">
        <el-form-item label="统一社会信用代码" prop="uscc">
          <el-input v-model="temp.uscc" />
        </el-form-item>
        <el-form-item label="企业名称" prop="company">
          <el-input v-model="temp.company" />
        </el-form-item>
        <el-form-item label="法定代表人" prop="representative">
          <el-input v-model="temp.representative" />
        </el-form-item>
        <el-form-item label="注册地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="temp.phone" type="" />
        </el-form-item>
        <el-form-item label="公司邮箱" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="失信原因" prop="reason">
          <el-input v-model="temp.reason" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createBlacklist">
          添加
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { deleteBlacklist, fetchBlacklist, addBlacklist } from '@/api/blacklist'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import waves from '@/directive/waves'
import { validateEmail, validatePhone } from '@/utils/validate' // waves directive

export default {
  components: { Pagination },
  directives: { waves },

  data() {
    return {
      listLoading: true,
      tableData: null,
      total: 0,
      listQuery: {
        company: '',
        representative: '',
        phone: '',
        email: '',
        address: '',
        current: 1,
        size: 10
      },
      blacklistRules: {
        uscc: [{ required: true, trigger: 'blur', message: '统一社会信用代码不可为空', validator: null }],
        company: [{ required: true, trigger: 'blur', message: '企业名称不可为空', validator: null }],
        address: [{ required: true, trigger: 'blur', message: '注册地址不可为空', validator: null }],
        representative: [{ required: true, trigger: 'blur', message: '法定代表人不可为空', validator: null }],
        reason: [{ required: true, trigger: 'blur', message: '失信原因不可为空', validator: null }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }]
      },
      dialogFormVisible: false,
      temp: {
        uscc: '',
        company: '',
        address: '',
        representative: '',
        reason: '',
        phone: '',
        email: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    indexMethod(index) {
      return (this.listQuery.current - 1) * this.listQuery.size + index + 1
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    createBlacklist() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          addBlacklist(this.temp).then(() => {
            this.dialogFormVisible = false
            this.getList()
          })
        } else {
          console.log('表单验证不通过')
        }
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        uscc: '',
        company: '',
        address: '',
        representative: '',
        reason: '',
        phone: '',
        email: ''
      }
    },
    getList() {
      this.listLoading = true
      fetchBlacklist(this.listQuery).then(({ data }) => {
        this.total = data.total
        this.tableData = data.items
      }).finally(() => {
        this.listLoading = false
      })
    },

    removeBlacklist(bid, company) {
      this.$confirm(`是否将${company}移出黑名单?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteBlacklist({ bid }).then(() => {
          this.getList()
        })
      })
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  /*width: 90px;*/
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
  height: 30px;
}

.el-table__expanded-cell[class*=cell] {
  padding: 0 0 10px 50px;
  background: #f3f3f3;
}

.blacklist-container {
  margin: 10px;
}
</style>
