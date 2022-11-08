<script lang="tsx" setup>
import { useRoute } from 'vue-router'
import GroupList from './list.vue'

const route = useRoute()
</script>

<template>
  <section>
    <router-view v-if="route.params.groupId" />
    <group-list v-else />
  </section>
</template>
