<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Fingerprint, User } from '@vicons/fa'
import { AddCircleTwotone } from '@vicons/material'

defineProps<{
  name: string
  id?: string
  author?: string | number
  desc?: string
}>()

const route = useRoute()
</script>

<template>
  <div class="saya-card">
    <div class="saya-card__info">
      <div class="saya-card__name ellipsis-1">{{ name }}</div>
      <span style="flex-shrink: 0">
        <n-switch />
        <router-link :to="`${route.path}/${id ? id : name}`">
          <add-circle-twotone class="saya-card_detail" />
        </router-link>
      </span>
    </div>
    <div style="flex: 1">
      <div class="saya-card__desc">{{ desc }}</div>
    </div>
    <div class="saya-card__id">
      <fingerprint /><span>{{ id }}</span>
    </div>
    <div class="saya-card__author"><user />{{ author }}</div>
  </div>
</template>

<style lang="scss" scoped>
.hr {
  position: relative;
}

hr {
  box-sizing: content-box;
  overflow: hidden;
  background: transparent;
  height: 1px;
  padding: 0;
  margin: 13px 0;
  background-color: #d0d7de;
  border: 0;

  &::before {
    content: '简介';
    display: block;
    position: absolute;
    color: var(--text-color-secondary);
    font-size: 12px;
    top: -10px;
    left: 50%;
    padding: 0 5px;
    transform: translateX(-50%);
    background-color: var(--bg-color);
  }
}

.saya-card {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--bg-color);
  box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  font-size: 15px;
  height: 172px;

  .saya-card__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .saya-card_detail {
    height: 20px;
    vertical-align: middle;
    cursor: pointer;
    padding: 0 5px;
    margin-left: 5px;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: var(--color-primary);
    }
  }

  .saya-card__name {
    font-size: 17px;
    font-weight: bold;
  }

  .saya-card__id,
  .saya-card__author {
    font-size: 13px;
    color: var(--text-color-secondary);
    line-height: 1em;
    margin: 4px 0;

    svg {
      height: 1em;
      width: 1em;
      margin-right: 5px;
      vertical-align: top;
    }

    & > *:not(svg) {
      vertical-align: middle;
    }
  }

  .saya-card__desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-line;
    line-height: 1.5rem;
    margin: 10px 0;
  }

  .ellipsis-1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
