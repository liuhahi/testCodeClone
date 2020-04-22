
import Mock from 'mockjs'
const List = []
/* Load json file, get data dn push into List */
var fs = require('fs')
var JsonFile = '/Users/scantist/project/vue-element-admin-stly/public/sampledata.json'
var result = JSON.parse(fs.readFileSync(JsonFile))
for (var i = 0; i < result.length; i++) {
  var row = result[i]
  List.push(Mock.mock(row))
}

/* Load sqldb, get data and push into List */
// var fs = require('fs')
// var initSqlJs = require('sql.js')
// var filebuffer = fs.readFileSync('/Users/situlingyun/Desktop/CodeCloneWeb/WebDev/vue-element-admin-stly/public/network-manager.db')
// var configsql = {
//   // load sql-wasm.wasm file
//   locateFile: filename => `./static/js/${filename}`
// }
// initSqlJs(configsql).then(function(SQL) {
//   var db = new SQL.Database(filebuffer)
//   var stmt = db.prepare('SELECT * FROM result')
//   while (stmt.step()) {
//     var row = stmt.getAsObject()
//     // console.log('----------Here is a row: ' + JSON.stringify(row))
//     List.push(Mock.mock(row))
//   }
// })

export default [
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const { source_file_name, page = 1, limit = 10, sort } = config.query

      let mockList = List.filter(item => {
        if (source_file_name && item.source_file_name.indexOf(source_file_name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

