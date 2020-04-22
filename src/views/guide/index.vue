<template>
  <div class="app-container">
    <el-upload action="https://upload.qbox.me" drag>
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        Drag and drop，or<em>Upload</em>
      </div>
    </el-upload>
    <el-button type="primary" @click="startAnalysis">
      Start analysing
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    },
    startAnalysis() {
      alert('Under development, ready to call the backend API')
    }
  }
}
</script>
