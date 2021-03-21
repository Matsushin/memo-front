<template>
  <input
    :type="props.type"
    :step="props.step"
    class="input-text"
    :disabled="props.disabled"
    :value="props.value"
    :placeholder="props.placeholder"
    @input="onInput"
    @focus="props.focus"
    @blur="props.blurred"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

interface Props {
  type: string
  step: string
  disabled: boolean
  change: (value: string) => void
  arg: string
  chnageOnArg: (value: string, arg: string) => void
  value: string
  focus: () => void
  blurred: () => void
  placeholder: string
}

export default defineComponent({
  props: {
    type: { default: 'text' },
    step: { default: '' },
    disabled: { default: false },
    change: {},
    arg: {},
    chnageOnArg: {},
    value: {},
    focus: {
      default: () => {
        return () => {}
      },
    },
    blurred: {
      default: () => {
        return () => {}
      },
    },
    placeholder: {
      default: '',
    },
  },
  setup(props: Props) {
    const onInput = (e: any) => {
      if (props.arg) {
        props.chnageOnArg(e.target.value, props.arg)
      } else {
        props.change(e.target.value)
      }
    }
    return {
      props,
      onInput,
    }
  },
})
</script>

<style lang="scss" scoped>
.input-text {
  @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight outline-none bg-white border-purple-500;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
