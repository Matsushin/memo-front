<template>
  <div>
    <div class="page-header">
      <h2 class="page-title mb-4">メモ登録</h2>
    </div>
    <section
      class="box-data-items relative mb-8 p-4 bg-white border border-border_gray-darker"
    >
      <form class="form">
        <div class="box-wrapper">
          <div class="box-label">
            <label class="w-32">タイトル</label>
          </div>
          <div>
            <InputText :value="title.inputtedValue" :change="changeTitle" />
            <span v-if="errorsState.message.title" class="item-message">
              {{ errorsState.message.title }}
            </span>
          </div>
          <div class="box-label">
            <label class="w-32">本文</label>
          </div>
          <div>
            <Textarea
              :value="body.inputtedValue"
              :change="changeBody"
              class="h-20"
            />
            <span v-if="errorsState.message.body" class="item-message">
              {{ errorsState.message.body }}
            </span>
          </div>
        </div>
        <Button :click="onClickCreate" class="w-40">登 録</Button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import InputText from '@/components/forms/InputText.vue'
import Textarea from '@/components/forms/Textarea.vue'
import Button from '@/components/forms/Button.vue'
import useMemo from '@/use/useMemo'

export default defineComponent({
  components: {
    InputText,
    Textarea,
    Button
  },
  setup(_, context: SetupContext) {
    const {
      state,
      createMemo,
      title,
      changeTitle,
      body,
      changeBody,
      getParams,
      errorsState,
    } = useMemo(context, true)

    const onClickCreate = async (e: any) => {
      e.preventDefault()
      const { validate, params } = getParams()
      if (validate.passes()) {
        await createMemo(params)
        if (state.status === 200) {
          context.root.$router.push('/memos')
        }
      } else {
        errorsState.message = {
          title: validate.errors.first('title'),
          body: validate.errors.first('body'),
        }
      }
    }

    return {
      errorsState,
      state,
      title,
      changeTitle,
      body,
      changeBody,
      onClickCreate,
    }
  },
})
</script>
