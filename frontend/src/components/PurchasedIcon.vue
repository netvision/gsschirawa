<template>
  <span
    class="purchased-icon"
    :style="iconStyle"
    aria-hidden="true"
  ></span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const iconStyle = computed(() => ({
  '--icon-url': `url('/purchased-icons/${props.name}.png')`
}))
</script>

<style scoped>
.purchased-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  background-color: currentColor;
  mask-image: var(--icon-url);
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  -webkit-mask-image: var(--icon-url);
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  vertical-align: -0.125em;
}
</style>
