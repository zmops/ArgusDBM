<template>
  <div class="app-container">
    <ParamsSearchForm :params="params" @search="search" @rest="reset" />
    <div class="table-page-main">
      <BusinessButtons :buttons="buttons" />
      <BusinessTable
        :table-data="tableData"
        :columns="columns"
        :loading="loading"
        serial
        selection
        @detail="detail"
      />
      <Pagination :total="total" :current-page="page" :size="size" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
    </div>
  </div>
</template>

<script>
import ParamsSearchForm from '@/components/BusinessComponents/ParamsSearchForm'
import BusinessButtons from '@/components/BusinessComponents/BusinessButtons'
import BusinessTable from '@/components/BusinessComponents/BusinessTable'
import Pagination from '@/components/BusinessComponents/Pagination'

export default {
  name: 'MysqlMonitor',
  provide() {
    return {
      farther: this
    }
  },
  components: {
    ParamsSearchForm,
    BusinessButtons,
    BusinessTable,
    Pagination
  },
  data() {
    return {
      form: {
        status: null,
        OnLineStatus: null,
        ip: '',
        name: '',
        tag: ''
      },
      page: 1,
      size: 15,
      total: 1000,
      params: [
        {
          componentName: 'RadioList',
          keyName: 'status',
          label: this.$t('tableView.status'),
          arrayData: [
            { value: null, label: this.$t('tableView.all') },
            { value: '0', label: this.$t('tableView.enable') },
            { value: '1', label: this.$t('tableView.disable') }
          ]
        },
        {
          componentName: 'RadioList',
          keyName: 'OnLineStatus',
          label: this.$t('tableView.onlineStatus'),
          arrayData: [
            { value: null, label: this.$t('tableView.all') },
            { value: '0', label: this.$t('tableView.enable') },
            { value: '1', label: this.$t('tableView.disable') }
          ]
        },
        {
          componentName: 'InputTemplate',
          keyName: 'name',
          label: this.$t('tableView.monitoring')
        },
        {
          componentName: 'InputTemplate',
          keyName: 'ip',
          label: this.$t('tableView.ip')
        },
        {
          componentName: 'SelectTemplate',
          keyName: 'tag',
          label: this.$t('tableView.tag'),
          optionId: 'code',
          optionName: 'name',
          options: []
        }
      ],
      buttons: [
        {
          label: this.$t('tableView.add'),
          icon: 'list_add',
          event: 'add'
        },
        {
          label: this.$t('tableView.delete'),
          icon: 'list_del',
          event: 'delete'
        }
      ],
      tableData: [
        { id: 1, a: 'a', b: 'b', online: '1', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 3, a: 'a', b: 'b', online: '1', status: false, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' },
        { id: 5, a: 'a', b: 'b', online: '0', status: true, e: 'e', f: 'f', g: 'g', h: 'h', i: 'i', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'o', p: 'p', q: 'q' }
      ],
      loading: false,
      columns: [
        {
          label: this.$t('tableView.monitoring'),
          prop: 'a',
          event: 'detail'
        },
        {
          label: this.$t('tableView.ip'),
          prop: 'b'
        },
        {
          label: this.$t('tableView.onlineStatus'),
          prop: 'online'
        },
        {
          label: this.$t('tableView.status'),
          width: 120,
          prop: 'status',
          idName: 'id',
          event: 'changeStatus'
        },
        {
          label: this.$t('tableView.version'),
          prop: 'e'
        },
        {
          label: this.$t('tableView.runningTime'),
          prop: 'f'
        },
        {
          label: this.$t('tableView.connected'),
          prop: 'g'
        },
        {
          label: this.$t('tableView.activity'),
          prop: 'h'
        },
        {
          label: 'QPS',
          prop: 'i'
        },
        {
          label: this.$t('tableView.inquire'),
          prop: 'j'
        },
        {
          label: this.$t('tableView.append'),
          prop: 'k'
        },
        {
          label: this.$t('tableView.update'),
          prop: 'l'
        },
        {
          label: this.$t('tableView.delete'),
          prop: 'm'
        },
        {
          label: this.$t('tableView.submit'),
          prop: 'n'
        },
        {
          label: this.$t('tableView.rollback'),
          prop: 'o'
        },
        {
          label: this.$t('tableView.read'),
          prop: 'p'
        },
        {
          label: this.$t('tableView.write'),
          prop: 'q'
        },
        {
          label: this.$t('tableView.operate'),
          prop: 'buttons',
          width: 120,
          idName: 'id',
          buttons: [
            {
              label: this.$t('tableView.edit'),
              event: 'edit'
            }
          ]
        }
      ]
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleSizeChange(size) {
      this.size = size
      this.getData()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getData()
    },
    /* 搜索 */
    search() {
      this.page = 1
      this.getData()
    },
    /* 重置 */
    reset() {
      this.form = {
        status: null,
        OnLineStatus: null,
        ip: '',
        name: '',
        tag: ''
      }
      this.page = 1
      this.size = 15
      this.getData()
    },
    /* 获取列表数据 */
    getData() {

    },
    /* 添加 */
    add() {
      console.log('添加')
    },
    /* 删除 */
    delete() {
      console.log('删除')
    },
    /* 跳转到详情 */
    detail() {
      this.$router.push('/monitor/mysqlDetail')
    },
    /* 切换状态 */
    changeStatus(id, v) {
      console.log(id)
      console.log(v)
    },
    /* 编辑 */
    edit(id) {
      console.log(id)
    }
  }
}

</script>
