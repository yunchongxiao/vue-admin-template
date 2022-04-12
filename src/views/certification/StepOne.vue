<template>
  <el-form ref="form" :model="form" label-width="110px">
    <el-form-item label="经办人姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="经办人身份证">
      <el-input v-model="form.id" />
    </el-form-item>
    <el-form-item label="身份证照片">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item label="经办人手机号">
      <el-input v-model="form.tel" />
    </el-form-item>
    <el-form-item label="经办人邮箱">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'StepOne',
  data() {
    return {
      form: {
        name: '',
        id: '',
        tel: '',
        email: ''
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>

</style>
