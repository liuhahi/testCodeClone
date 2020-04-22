<template>
  <div class="dashboard-editor-container">
    <h1>Code Clone Analysis</h1>
    Code cloning refers to the duplication of source code. It is the most common way of reusing source code in software development. If a bug is identified in one segment of code, all the similar segments need to be checked for the same bug. Consequently, this cloning process may lead to bug propagation that significantly affects the maintenance cost. By considering this problem, code clone detection (CCD) appears as an active area of research.
  </div>
</template>

<script>

export default {
  name: 'DashboardAdmin',
  components: { },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
