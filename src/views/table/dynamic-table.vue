<template>
  <div class="app-container">
    <vue-table-dynamic
      ref="table"
      :params="params"
      @select="onSelect"
      @selection-change="onSelectionChange"
    />
  </div>
</template>

<script>
import VueTableDynamic from 'vue-table-dynamic'

export default {
  name: 'Demo',
  components: { VueTableDynamic },
  data() {
    return {
      params: {
        data: [],
        header: 'row',
        border: true,
        stripe: true,
        pagination: true,
        pageSize: 5,
        pageSizes: [5, 10, 20, 50],
        // sort: [0, 1, 2],
        enableSearch: true
        // showCheck: true,
        // columnWidth: [{ column: 0, width: '10%' }, { column: 3, width: '45%' }, { column: 3, width: '45%' }]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      var fs = require('fs')
      var initSqlJs = require('sql.js')
      var filebuffer = fs.readFileSync('/Users/scantist/project/vue-element-admin-stly/public/network-manager.db')
      var configsql = {
        // 指定加载sql-wasm.wasm文件的位置
        locateFile: filename => `./static/js/${filename}`
      }
      initSqlJs(configsql).then(function(SQL) {
        var db = new SQL.Database(filebuffer)
        // var res = db.exec('SELECT * FROM result')
        // this.list = JSON.stringify(res)
        var stmt = db.prepare('SELECT * FROM result')
        while (stmt.step()) { //
          var rowobj = stmt.getAsObject()
          var result = []
          var keys = Object.keys(rowobj)
          keys.forEach(function(key) {
            console.log('HHHHHH' + JSON.stringify(rowobj[key]))
            result.push(rowobj[key])
          })
          this.params.data.push(result)
        }
      })
    },
    onSelect(isChecked, index, data) {
      console.log('onSelect: ', isChecked, index, data)
      console.log('Checked Data:', this.$ref.table.getCheckedRowDatas(true))
    },
    onSelectionChange(checkedDatas, checkedIndexs, checkedNum) {
      console.log('onSelectionChange: ', checkedDatas, checkedIndexs, checkedNum)
    }
  }
}
</script>
