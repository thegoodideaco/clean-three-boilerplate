<template>
  <div>
    <h1>Hey it works</h1>

    <pre>
        {{ state }}
    </pre>
  </div>
</template>

<script lang="ts">
import { watchEffect } from 'vue'
import { useViewInfo } from './useViewProp'

export default {
  setup() {
    const state = useViewInfo()

    const { documentVisible } = state

    watchEffect(() => {
      console.log(documentVisible.value)
    })

    return {
      state
    }
  }
}
</script>

<style></style>
