<template>
  <div class="tools-search-engine-view">
    <div class="form-box">
      <el-form :model="searchForm" status-icon ref="searchForm" label-width="0px" :rules="rules">
        <el-form-item label="" prop="keywords">
          <el-input placeholder="请输入关键词" v-model="searchForm.keywords" class="input-with-select">
            <el-button type="primary" slot="append" icon="el-icon-search" @click="submitForm()"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="totalPage">
          <el-input-number v-model="searchForm.totalPage" :min="1" :max="1000" label="搜索总页数"></el-input-number>
          <div>搜索总页数</div>
        </el-form-item>
      </el-form>
      <div v-if="searchLog.length">
        <el-input
          type="textarea"
          placeholder=""
          v-model="searchLogText"
          show-word-limit
          :disabled="true"
          :rows="20"
        >
        </el-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ToolsSearchEngineView',
  data () {
    return {
      searchForm: {
        keywords: '',
        totalPage: 50
      },
      rules: {
        keywords: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ]
      },
      // 搜索的日志
      searchLog: [] as string[]
    }
  },
  methods: {
    async submitForm () {
      window.api.on('tooles/search-engine/log/info', this.webLog.bind(this))
      try {
        await window.api.startSearchEngine({
          ...this.searchForm
        })
      } catch (error) {
        console.log(error)
      }
      window.api.removeListener('tooles/search-engine/log/info', this.webLog)
    },

    webLog (log: string) {
      this.searchLog.push(log)
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
  .form-box {
    margin: 0 auto;
    margin-top: 100px;
    width: 60%;
  }
}
</style>
