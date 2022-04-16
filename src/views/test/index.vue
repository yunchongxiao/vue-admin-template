<template>
  <div class="blacklist-container">
  <el-table
    v-loading="listLoading"
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="统一社会信用代码" >
            <span>{{ props.row.uscc }}</span>
          </el-form-item>
          <el-form-item label="企业名称">
            <span>{{ props.row.company }}</span>
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
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="企业名称"
      prop="company"
    />
    <el-table-column
      label="法定代表人"
      prop="representative"
      width="100px"
    />
    <el-table-column
      label="手机"
      prop="phone"
      width="110px"
    />
    <el-table-column
      label="邮箱"
      prop="email"
      width="250px"
    />
    <el-table-column
      label="地址"
      prop="address"
    />
  </el-table>
  </div>
</template>

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
   margin: 30px;
}
</style>

<script>
import { fetchList } from '@/api/blacklist'

export default {
  data() {
    return {
      listLoading: true,
      list: null,
      tableData: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await fetchList()
      console.log(data)
      this.tableData = data
      this.listLoading = false
    }
  }
}
</script>
