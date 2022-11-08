<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, getCurrentInstance, reactive } from 'vue'
import type { Ref } from 'vue'
import { User, PaperPlane, UserFriends } from '@vicons/fa'
import { RssFeedRound, TerminalTwotone } from '@vicons/material'
import type { LogInst } from 'naive-ui'
import type { Type as BtnType } from 'naive-ui/es/button/src/interface'

import ChartBar from '@/components/charts/ChartBar.vue'

import InfoCard from './components/InfoCard.vue'
import BotActivite from './composables/BotActivite.vue'

const { proxy } = getCurrentInstance()!

// === 实时日志 part1 start ===

const logInst = ref<LogInst>()
const canScroll = ref<boolean>(true)

// === InfoCard start ===

interface homeDataType {
  group_count: number
  friend_count: number
  uid_count: number
  push_count: number
  all_push_count: number
  talk_count: { time: string; count: number }[]
}

const homeData = reactive({
  group_count: 0,
  friend_count: 0,
  uid_count: 0,
  push_count: 0,
  all_push_count: 0,
})

const barChartData: Ref<{
  labels: string[]
  datasets: {
    backgroundColor: string
    borderWidth: number
    borderSkipped: boolean
    borderRadius: number
    data: number[]
    maxBarThickness: number
  }[]
}> = ref({
  labels: [] as string[],
  datasets: [
    {
      backgroundColor: '#fff',
      borderWidth: 0,
      borderSkipped: false,
      borderRadius: 8,
      data: [] as number[],
      maxBarThickness: 20,
    },
  ],
})

const $lib = proxy!.$lib

onMounted(() => {
  $lib.requests.get({
    url: 'http://127.0.0.1:8000/api/home',
    loading: true,
    success: (arg: homeDataType) => {
      homeData.group_count = arg.group_count
      homeData.friend_count = arg.friend_count
      homeData.uid_count = arg.uid_count
      homeData.push_count = arg.push_count
      homeData.all_push_count = arg.all_push_count
      const labels: string[] = []
      const data: number[] = []
      try {
        for (const i of arg.talk_count) {
          labels.push(i.time)
          data.push(i.count)
        }
        barChartData.value.labels = labels
        barChartData.value.datasets[0].data = data
      } catch (e) {
        console.error(e)
      }
    },
  })
})

// === 实时日志 part2 start ===

const scrollBtnText = ref('停止滚动')

function stopLogScroll() {
  if (canScroll.value) {
    canScroll.value = false
    scrollBtnText.value = '开始滚动'
  } else {
    canScroll.value = true
    scrollBtnText.value = '停止滚动'
  }
}

function clearLog() {
  log.splice(0, log.length)
}

const wsUrl = 'ws://127.0.0.1:8000/log'
let ws: WebSocket

const log = reactive<string[]>([])
const logBtnType = ref<BtnType>('success')
const logBtnText = ref('连接')
const logBtnDisabled = ref(true)
const wsStatus = ref(false)

watch(log, () => {
  if (canScroll.value === true) logInst.value?.scrollTo({ position: 'bottom', slient: true })
})

function createWSClient() {
  ws = new WebSocket(wsUrl)
  ws.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data)
      log.push(`[${data.record.time.repr.substring(0, 23)}] ${data.record.message}`)
    } catch (err) {
      const data = e.data
      log.push(`[now] ${data}`)
    }
  }
  ws.onopen = () => {
    console.log(`WebSocket 已连接到: ${wsUrl}`)
    log.push(`WebSocket 已连接到: ${wsUrl}`)
    logBtnType.value = 'error'
    logBtnText.value = '断开连接'
    wsStatus.value = true
    logBtnDisabled.value = false
  }
  ws.onclose = () => {
    console.log('WebSocket 连接已断开')
    log.push('WebSocket 连接已断开')
    logBtnType.value = 'primary'
    logBtnText.value = '重连'
    wsStatus.value = false
    logBtnDisabled.value = false
    if (canScroll.value === true) logInst.value?.scrollTo({ position: 'bottom', slient: true })
  }
  // ws.onerror = (e) => {
  //   console.error(e)
  //   log.value! += `\nWebSocket 连接错误`
  //   logBtnType.value = 'error'
  //   logBtnText.value = '重连'
  // }
  return ws
}

let WS = createWSClient()
function closeOrReconnectWS() {
  if (wsStatus.value) WS.close()
  else WS = createWSClient()
}

onBeforeUnmount(() => {
  WS.close()
})
</script>

<template>
  <section class="dashboard">
    <div class="info-board">
      <n-grid :x-gap="24" :y-gap="24" cols="1 m:2 l:4" responsive="screen">
        <n-grid-item>
          <info-card title="群组数量" :contain="homeData.group_count"><user-friends /></info-card>
        </n-grid-item>
        <n-grid-item>
          <info-card title="好友数量" :contain="homeData.friend_count"><user /></info-card>
        </n-grid-item>
        <n-grid-item>
          <info-card title="订阅数量" :contain="homeData.uid_count"><rss-feed-round /></info-card>
        </n-grid-item>
        <n-grid-item>
          <info-card
            title="推送数量"
            :contain="homeData.push_count"
            :extra="homeData.all_push_count"
          >
            <paper-plane />
          </info-card>
        </n-grid-item>
      </n-grid>
    </div>
    <div style="margin-top: 24px">
      <n-grid :x-gap="24" :y-gap="24" :cols="13" item-responsive responsive="screen">
        <n-grid-item span="13 m:7">
          <div class="card">
            <chart-bar
              :height="220"
              :data="barChartData"
              style="border-radius: 12px; box-shadow: 0 4px 6px rgb(0 0 0 / 12%); overflow: hidden"
            />
            <div class="card__title">消息数量</div>
            <div class="card__subtitle">仅限过去8小时</div>
          </div>
        </n-grid-item>
        <n-grid-item span="13 m:6">
          <div class="card" style="height: 315px; padding: 20px">
            <bot-activite />
          </div>
        </n-grid-item>
      </n-grid>
    </div>
    <div style="margin: 24px 0">
      <div class="card console">
        <p class="log-card__title">
          <span class="console-icon"><terminal-twotone /></span>
          <span style="vertical-align: middle; margin-right: 10px">实时日志</span>
          <n-button
            size="small"
            :type="logBtnType"
            :disabled="logBtnDisabled"
            style="transition: background-color 0.2s ease"
            @click="closeOrReconnectWS"
          >
            {{ logBtnText }}
          </n-button>
          <n-button
            size="small"
            color="#8a2be2"
            style="margin-left: 8px; transition: background-color 0.2s ease"
            @click="stopLogScroll"
          >
            {{ scrollBtnText }}
          </n-button>
          <n-button
            size="small"
            color="#ff69b4"
            style="margin-left: 8px; transition: background-color 0.2s ease"
            @click="clearLog"
          >
            清除历史
          </n-button>
        </p>
        <n-log ref="logInst" :rows="32" :lines="log" language="python3" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  padding: 16px;
  border-radius: 12px;
  background-color: var(--bg-color);
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

  .card__title {
    margin-top: 20px;
    font-weight: bold;
  }

  .card__subtitle {
    margin-top: 3px;
    color: var(--text-color-secondary);
    font-size: 14px;
    font-weight: bold;
  }
}

.console {
  position: relative;
  background-color: #282c34;
  width: 100%;
  overflow: auto;
  color: #abb2bf;
  padding-top: 70px;

  pre {
    margin: 0;
  }

  .log-card__title {
    position: absolute;
    top: 10px;
    font-weight: bold;
    color: #eee;
  }
}

.console-icon {
  margin-right: 5px;

  svg {
    height: 1.5em;
    vertical-align: middle;
  }
}
</style>
