<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.source_file_name" placeholder="Source File Name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Download
      </el-button>
    </div>

    <el-table
      ref="table"
      :data="list"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Source Code" prop="source_code" align="left" width="600">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.source_file_name }}:{{ row.source_start_line }}-{{ row.source_end_line }}</span>
          <el-form>
            <editor
              :value="row.source_code"
              :options="getEditorOptions(row.source_start_line)"
              height="150"
              lang="c_cpp"
              theme="chrome"
              @init="editorInit"
            />
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="Similar Code" prop="matched_code" align="left" width="600">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.matched_file_name }}:{{ row.matched_start_line }}-{{ row.matched_end_line }}</span>
          <el-form>
            <editor
              :value="row.matched_code"
              :options="getEditorOptions(row.source_start_line)"
              height="150"
              lang="c_cpp"
              theme="chrome"
              @init="editorInit"
            />
          </el-form>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import editor from 'vue2-ace-editor'

export default {
  name: 'ComplexTable',
  components: { editor, Pagination },
  directives: { waves },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        source_file_name: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
      // fetch('sampledata.json')
      //   .then(response => response.json())
      //   .then(data => {
      //     this.list = data
      //     this.total = data.length
      //   })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    editorInit() {
      require('brace/ext/language_tools')
      require('brace/mode/html')
      require('brace/mode/javascript')
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript')
      require('brace/mode/c_cpp')
      require('brace/theme/dracula')
      require('brace/ext/beautify')
    },
    getEditorOptions(start_line) {
      return {
        readOnly: true,
        showPrintMargin: false,
        showLineNumbers: true,
        highlightActiveLine: false,
        behavioursEnabled: false,
        highlightGutterLine: false,
        highlightSelectedWord: false,
        firstLineNumber: start_line
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id',
          'source_file_name',
          'source_start_line',
          'source_end_line',
          'source_code',
          'matched_file_name',
          'matched_start_line',
          'matched_end_line',
          'matched_code']
        const filterVal = ['id',
          'source_file_name',
          'source_start_line',
          'source_end_line',
          'source_code',
          'matched_file_name',
          'matched_start_line',
          'matched_end_line',
          'matched_code']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-code-clone-test'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        // if (j === 'source_code' || j === 'matched_code') {
        //   return CodeFormat(v[j])
        // } else {
        return v[j]
        // }
      }))
    }
  }
}
</script>
