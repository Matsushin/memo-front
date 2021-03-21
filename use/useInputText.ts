import { reactive } from '@vue/composition-api'

const useInputText = (initialValue: string) => {
  const state = reactive({
    inputtedValue: initialValue,
    isFocused: false,
  })

  // 入力
  const change = (value: string) => {
    state.inputtedValue = value
  }

  // フォーカスイン
  const focus = () => {
    state.isFocused = true
  }

  // フォーカスアウト
  const blurred = () => {
    state.isFocused = false
  }

  return {
    state,
    change,
    focus,
    blurred,
  }
}

export default useInputText
