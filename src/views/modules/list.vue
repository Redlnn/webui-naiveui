<script lang="ts" setup>
import SayaCard from './components/SayaCard.vue'
</script>

<template>
  <div class="info-board">
    <n-grid :x-gap="24" :y-gap="24" cols="1 m:2 l:3 xl:4 2xl:5" responsive="screen">
      <n-grid-item>
        <saya-card
          name="缩写预测"
          id="AbbreviatedPrediction"
          author="SAGIRI-kawaii"
          desc="一个获取英文缩写意思的插件，在群中发送 `缩 内容` 即可"
        />
      </n-grid-item>
      <n-grid-item>
        <saya-card
          name="普通话转抽象话"
          id="AbstractMessageTransformer"
          author="SAGIRI-kawaii"
          desc="一个普通话转抽象话的插件，在群中发送 `/抽象 文字` 即可"
        />
      </n-grid-item>
      <n-grid-item>
        <saya-card
          name="学术搜索"
          id="Aminer"
          author="SAGIRI-kawaii"
          desc="一个搜索导师信息的插件"
        />
      </n-grid-item>
      <n-grid-item>
        <saya-card
          name="Apex查询"
          id="ApexStat"
          author="SAGIRI-kawaii"
          :desc="`一个Apex数据查询插件\n在群中发送 \`/apex origin用户名\` 即可`"
        />
      </n-grid-item>
      <n-grid-item>
        <saya-card
          name="头像趣图"
          id="AvatarFunPic"
          author="SAGIRI-kawaii"
          desc="一个可以生成头像相关趣味图的插件"
        />
      </n-grid-item>
      <n-grid-item>
        <saya-card
          name="搜番"
          id="BangumiInfoSearcher"
          author="SAGIRI-kawaii"
          desc="一个可以搜索番剧信息的插件，在群中发送 `番剧 {番剧名}` 即可"
        />
      </n-grid-item>
    </n-grid>
  </div>
</template>
