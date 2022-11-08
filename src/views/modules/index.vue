<script lang="tsx" setup>
import { useRoute } from 'vue-router'
import ModulesList from './list.vue'

const route = useRoute()
</script>

<template>
  <section>
    <router-view v-if="route.params.moduleId" />
    <modules-list v-else />
  </section>
</template>
