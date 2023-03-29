<!-- 概览页面 -->
<template>
  <div class="overview">
    <el-row :gutter="10">
      <el-col v-for="(item, index) in numList" :key="'col'+index" :span="3">
        <div class="item box1">
          <div class="title">{{ item.title }}</div>
          <div class="val" :class="item.title==='在线监控数'?'val2':item.title==='离线监控数'?'val3':''">{{ item.val }}</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item box2">
          <div class="title">最新告警</div>
          <div class="chart">
            <el-table
              :data="alarmTableData"
              stripe
              size="mini"
              height="200"
              style="width: 100%"
            >
              <el-table-column
                prop="level"
                label="告警级别"
                width="180"
              />
              <el-table-column
                prop="status"
                label="状态"
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="time"
                label="告警时间"
              />
              <el-table-column
                prop="content"
                label="告警内容"
              />
            </el-table>
            <Pagination :size="5" :current-page="1" :total="1" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item box2">
          <div class="title">未关闭告警数量</div>
          <div class="chart">
            <BarChart :x-data="alarmXData" :series-data="alarmSeriesData" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item box2">
          <div class="title">数据库状态统计</div>
          <div class="chart">
            <BarChart :x-data="sqlXData" :series-data="sqlSeriesData" legend />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item box2">
          <div class="title">离线MySQL</div>
          <div class="chart">
            <el-table
              :data="myaqlTableData"
              stripe
              size="mini"
              height="200"
              style="width: 100%"
            >
              <el-table-column
                prop="name"
                label="监控名称"
              />
              <el-table-column
                prop="ip"
                label="IP/域名"
              />
              <el-table-column
                prop="time"
                label="最后在线时间"
              />
            </el-table>
            <Pagination :size="5" :current-page="1" :total="1" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item box2">
          <div class="title">离线PostgreSQL</div>
          <div class="chart">
            <el-table
              :data="pgsqlTableData"
              stripe
              size="mini"
              height="200"
              style="width: 100%"
            >
              <el-table-column
                prop="name"
                label="监控名称"
              />
              <el-table-column
                prop="ip"
                label="IP/域名"
              />
              <el-table-column
                prop="time"
                label="最后在线时间"
              />
            </el-table>
            <Pagination :size="5" :current-page="1" :total="1" />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item box2">
          <div class="title">离线Oracle</div>
          <div class="chart">
            <el-table
              :data="oracleTableData"
              stripe
              size="mini"
              height="200"
              style="width: 100%"
            >
              <el-table-column
                prop="name"
                label="监控名称"
              />
              <el-table-column
                prop="ip"
                label="IP/域名"
              />
              <el-table-column
                prop="time"
                label="最后在线时间"
              />
            </el-table>
            <Pagination :size="5" :current-page="1" :total="1" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/views/overview/Pagination'
import BarChart from '@/views/overview/BarChart'
import { WARN_LEVEL } from '@/const/const'
import { getSummaryStatic } from '@/api/monitor/summary'
import i18n from '@/lang'
import { getAlerts } from '@/api/monitor/alarm-manage-batch'
export default {
  name: 'Overview',
  components: {
    Pagination,
    BarChart
  },
  data() {
    return {
      numList: [],
      alarmTableData: [],
      myaqlTableData: [
        { name: 'MySQL1', ip: '172.1.16.120', time: '2023-01-30 15:19:32' },
        { name: 'MySQL2', ip: '172.1.16.138', time: '2023-01-30 15:19:32' },
        { name: 'MySQL3', ip: '172.1.16.180', time: '2023-01-30 15:19:32' },
        { name: 'MySQL4', ip: '172.1.16.25', time: '2023-01-30 15:19:32' }
      ],
      pgsqlTableData: [
        { name: 'PostgreSQL1', ip: '172.1.16.56', time: '2023-01-30 15:19:32' },
        { name: 'PostgreSQL2', ip: '172.1.16.78', time: '2023-01-30 15:19:32' },
        { name: 'PostgreSQL3', ip: '172.1.16.65', time: '2023-01-30 15:19:32' },
        { name: 'PostgreSQL4', ip: '172.1.16.87', time: '2023-01-30 15:19:32' }
      ],
      oracleTableData: [
        { name: 'Oracle1', ip: '172.1.16.36', time: '2023-01-30 15:19:32' },
        { name: 'Oracle2', ip: '172.1.16.85', time: '2023-01-30 15:19:32' },
        { name: 'Oracle3', ip: '172.1.16.57', time: '2023-01-30 15:19:32' },
        { name: 'Oracle4', ip: '172.1.16.64', time: '2023-01-30 15:19:32' }
      ],
      alarmXData: WARN_LEVEL.map((i) => { return i.value }),
      alarmSeriesData: [
        {
          name: '未关闭告警数量',
          type: 'bar',
          barMaxWidth: 36, // 柱子的最大宽度
          data: [
            { value: 23, itemStyle: { color: '#FBBC0A' }},
            { value: 43, itemStyle: { color: '#E37045' }},
            { value: 32, itemStyle: { color: '#C72222' }}
          ]
        }
      ],
      sqlXData: ['MySQL', 'PostgreSQL', 'Oracle'],
      sqlSeriesData: [
        {
          name: '在线',
          type: 'bar',
          color: '#5AD8A6',
          data: [46, 38, 63]
        },
        {
          name: '离线',
          type: 'bar',
          color: '#E86452',
          data: [6, 5, 8]
        },
        {
          name: '禁用',
          type: 'bar',
          color: '#F6BD16',
          data: [10, 13, 10]
        }
      ]
    }
  },
  async created() {
    await this.getAppCounts()
    await this.getAlertRecently()
  },
  methods: {
    getAppCounts() {
      getSummaryStatic().then(res => {
        if (res.code === 0 && res.data) {
          const counts = res.data
          this.numList = []
          counts.forEach(item => {
            const i18nTitle = i18n.t(item.key)
            this.numList.push({
              title: i18nTitle,
              val: item.count
            })
          })
        }
      })
    },
    getAlertRecently() {
      getAlerts({}).then(res => {
        if (res.code === 0 && res.data) {
          this.alarmTableData = []
          const content = res.data.content
          content.forEach(item => {
            this.alarmTableData.push({
              level: i18n.t('alert.priority.' + item.priority),
              status: i18n.t('alert.status.' + item.status),
              content: item.content,
              time: item.gmtUpdate
            })
          })
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.overview {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #F0F2F5;

  .item{
    width: 100%;
    margin-bottom: 10px;
    background-color: #FFFFFF;
    border-radius: 4px;

    .title {
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-size: 14px;
      color: #4E5969;
    }
  }

  .box1 {
    height: 130px;

    .title {
      padding-left: 14px;
    }

    .val{
      width: 100%;
      height: 82px;
      line-height: 60px;
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      color: #4E5969;
    }

    .val2{
      color: #5CD8A7;
    }

    .val3{
      color: #E86453;
    }
  }

  .box2{
    height: 296px;

    .title {
      padding-left: 22px;
    }

    .chart {
      width: 100%;
      height: calc( 100% - 48px );
      padding: 0 16px;
    }
  }
}
</style>
