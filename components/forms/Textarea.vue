<template>
  <textarea
    class="textarea"
    :value="props.value"
    @input="(e) => props.change(e.target.value)"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

interface Props {
  change: (value: string) => void
  value: string
}

export default defineComponent({
  props: {
    change: {},
    value: {},
  },
  setup(props: Props) {
    return {
      props,
    }
  },
})
</script>

<style lang="scss" scoped>
.textarea {
  @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight outline-none bg-white border-purple-500;
}
</style>
