<template>
  <div class="container">
    <el-steps :active="active" simple>
      <el-step title="填写企业信息" icon="el-icon-edit" />
      <el-step title="等待信息审核" icon="el-icon-upload" />
      <el-step title="完成认证" icon="el-icon-finished" />
    </el-steps>
    <step-one v-if="active===0" />
  </div>
</template>

<script>
import StepOne from '@/views/certification/StepOne'

export default {
  name: 'Certification',
  components: { StepOne },
  data() {
    return {
      active: 0
    }
  },
  methods: {}
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 80%
}
</style>
