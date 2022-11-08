<script lang="ts" setup>
import avatarURL from '@/assets/1.png?url'
import { AddCircleTwotone } from '@vicons/material'
import { Fingerprint, User, GitAlt } from '@vicons/fa'
</script>

<template>
  <div class="card">
    <n-thing content-indented>
      <template #avatar>
        <n-avatar :src="avatarURL" :size="55" />
      </template>
      <template #header><span style="font-size: 20px">模块名称</span></template>
      <template #header-extra>
        <span style="vertical-align: middle; margin-right: 8px">总开关：</span>
        <n-switch />
      </template>
      <template #description>一句话介绍</template>
      <div class="info">
        <div class="info__line">
          <span class="info__icon"><Fingerprint /></span>
          <span class="info__detail">模块ID</span>
        </div>
        <div class="info__line">
          <span class="info__icon"><User /></span>
          <span class="info__detail">Red_lnn、BlueGlassBlock</span>
        </div>
        <div class="info__line">
          <span class="info__icon"><git-alt /></span>
          <span class="info__detail">0.1.0-dev</span>
        </div>
      </div>
      <template #action>
        <n-space style="margin-bottom: 10px">
          <n-tag round>爱在西元前</n-tag>
          <n-tag type="success" round>不该</n-tag>
          <n-tag type="warning" round>超人不会飞</n-tag>
          <n-tag type="error" round>手写的从前</n-tag>
          <n-tag type="primary" round>哪里都是你</n-tag>
        </n-space>
        <n-space>
          <n-button size="small" type="primary" ghost>
            <template #icon>
              <n-icon>
                <add-circle-twotone />
              </n-icon>
            </template>
            用法
          </n-button>
          <n-button size="small" type="warning" ghost>
            <template #icon>
              <n-icon>
                <add-circle-twotone />
              </n-icon>
            </template>
            重载
          </n-button>
          <n-button size="small" type="error" ghost>
            <template #icon>
              <n-icon>
                <add-circle-twotone />
              </n-icon>
            </template>
            卸载
          </n-button>
        </n-space>
      </template>
    </n-thing>
  </div>
  <n-grid cols="2">
    <n-grid-item>
      <div class="card" style="margin: 20px 10px 0 0; height: calc(100% - 20px)">
        <n-h3>已启用群</n-h3>
        <div style="height: 765px"></div>
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="card" style="margin: 20px 0 0 10px; height: calc(100% - 20px)">
        <n-h3>已禁用群</n-h3>
      </div>
    </n-grid-item>
  </n-grid>
</template>

<style lang="scss" scoped>
.card {
  background-color: var(--bg-color);
  padding: 30px;
  border-radius: 10px;
}

.info {
  display: grid;
  align-items: center;
  grid-template-columns: 250px 250px;

  .info__line {
    display: flex;
    align-items: center;
  }

  .info__icon {
    margin-right: 6px;
    height: 1.1em;
    svg {
      height: 1.1em;
    }
  }

  .info__detail {
    vertical-align: middle;
  }
}
</style>
