<script setup lang="ts">
import { zhCN, dateZhCN, darkTheme, GlobalThemeOverrides } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import NaiveApi from '@/composables/NaiveApi.vue'
import { isDark } from '@/composables/index'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily:
      '"HarmonyOS Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono:
      '"Cascadia Mono PL SemiLight", "Cascadia Mono SemiLight", SFMono-Regular, Menlo, Consolas, Courier, monospace',
    fontWeight: '450',
    fontWeightStrong: '600',
    primaryColor: '#409EFF',
    primaryColorHover: '#79BBFF',
    primaryColorPressed: '#337ECC',
    primaryColorSuppl: '#79BBFF',
    infoColor: '#5E6064',
    infoColorHover: '#75787E',
    infoColorSuppl: '#75787E',
    infoColorPressed: '#47494C',
    errorColor: '#E65146',
    errorColorHover: '#F56C61',
    errorColorPressed: '#D5463B',
    errorColorSuppl: '#F56C61',
    avatarColor: '#C1C5CD',
  },
}
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="isDark ? darkTheme : undefined"
    :theme-overrides="themeOverrides"
    :hljs="hljs"
    inline-theme-disabled
    abstract
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider placement="top">
          <n-notification-provider :max="3">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in" appear>
                <component :is="Component" />
              </transition>
            </router-view>
            <naive-api />
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
