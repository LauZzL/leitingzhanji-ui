<template>
  <router-view/>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark(true)


</script>

