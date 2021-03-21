<template>
  <button
    :class="`button-secondary ${props.disabled ? 'button-disabled' : ''}`"
    :value="props.value"
    @click.prevent="(e) => (props.disabled ? '' : props.click(e))"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

interface Props {
  click: (e: any) => void
  value: string
  disabled: boolean
  keydown: boolean
}

export default defineComponent({
  props: {
    click: {},
    value: {},
    disabled: {
      type: Boolean,
      default: false,
    },
    keydown: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props) {
    onMounted(() => {
      if (props.keydown && !props.disabled) {
        // buttonタグにkeydownイベントを設定できなかった
        // 恐らくSSRでないから。なのでレンダリング後にイベントを追加
        // 使う箇所はログインだけ。ログイン時は必ずリロードするので問題ない
        window.addEventListener('keydown', (e: any) => {
          if (e.keyCode === 13) {
            // Enter
            props.click(e)
          }
        })
      }
    })
    return {
      props,
    }
  },
})
</script>
