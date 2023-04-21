<template>
  <div class="tools-search-engine-view">
    <div class="title">搜索引擎爬取工具</div>
    <div class="form-box">
      <el-form :model="searchForm" status-icon ref="searchForm" label-width="0px" :rules="rules">
        <el-form-item label="" prop="keywords">
          <el-input placeholder="请输入关键词" v-model="searchForm.keywords" class="input-with-select">
            <el-button type="primary" slot="append" icon="el-icon-search" @click="submitForm()"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="爬取页数">
          <el-input-number v-model="searchForm.totalPage" :min="1" :max="1000" label="爬取页数"></el-input-number>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="searchForm.startDate"
            type="date"
            style="width: 150px"
            placeholder="开始时间">
          </el-date-picker>
          ~
          <el-date-picker
            v-model="searchForm.endDate"
            type="date"
            style="width: 150px"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">开爬</el-button>
        </el-form-item>
      </el-form>

      <!-- 日志展示框 -->
      <div v-if="searchLog.length">
        <el-input
          type="textarea"
          placeholder=""
          v-model="searchLogText"
          show-word-limit
          :disabled="true"
          :rows="10"
        >
        </el-input>
      </div>
      <!-- 下载按钮 -->
      <div style="margin-top: 10px" v-show="isFinish">
        <el-button type="primary" size="mini" plain @click="clickDownloadBtn">下载</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'

export default Vue.extend({
  name: 'ToolsSearchEngineView',
  data () {
    return {
      searchForm: {
        keywords: '',
        totalPage: 50,
        startDate: null,
        endDate: null
      },
      rules: {
        keywords: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ]
      },
      // 搜索的日志
      searchLog: [] as string[],
      // 是否完成
      isFinish: false,
      // 下载信息
      downloadInfo: {}
    }
  },
  methods: {
    async submitForm () {
      this.isFinish = false
      window.api.on('tooles/search-engine/log/info', this.webLog.bind(this))
      try {
        const downloadInfo = await window.api.invoke('tools/search-engine', {
          ...this.searchForm,
          timearea: this.getTimearea()
        })
        this.isFinish = true
        this.downloadInfo = downloadInfo
        this.$message({
          message: '爬取成功',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }
      window.api.removeListener('tooles/search-engine/log/info', this.webLog)
    },

    webLog (log: string) {
      this.searchLog.unshift(log)
    },
    // 点击下载按钮
    async clickDownloadBtn () {
      await window.api.invoke('outputfile/download', this.downloadInfo)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      this.isFinish = false
      this.downloadInfo = {}
    },
    getTimearea (): string {
      const {
        startDate, endDate
      } = this.searchForm
      if (startDate) {
        return `${this.getFormatTime(startDate)}~${this.getFormatTime(endDate || new Date())}`
      }
      return ''
    },
    getFormatTime (date: Date) {
      return moment(date).format('YYYY-MM-DD')
    }
  },
  computed: {
    searchLogText (): string {
      return this.searchLog.join('\n')
    }
  },
  components: {
  }
})
</script>

<style scoped lang="scss">
.tools-search-engine-view {
  .title {
    font-size: 18px;
    font-weight: 600;
    margin: 50px auto;
  }
  .form-box {
    margin: 0 auto;
    margin-top: 50px;
    width: 60%;
  }
}
</style>
