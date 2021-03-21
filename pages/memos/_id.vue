<template>
  <div>
    <div class="page-header">
      <h2 class="page-title mb-4">メモ詳細・編集</h2>
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
        <Button :click="onClickUpdate" class="w-40">更 新</Button>
        <Button :click="onClickDelete">削除</Button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from '@vue/composition-api'
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
      getMemoById,
      updateMemo,
      deleteMemo,
      title,
      changeTitle,
      body,
      changeBody,
      getParams,
      errorsState,
    } = useMemo(context, true)

    onMounted(async () => {
      await getMemoById(context.root.$route.params.id)
      changeTitle(state.memo.title)
      changeBody(state.memo.body)
    })

    const onClickUpdate = async (e: any) => {
      e.preventDefault()
      const { validate, params } = getParams()
      if (validate.passes()) {
        await updateMemo(context.root.$route.params.id, params)
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

    const onClickDelete = async (e: any) => {
      e.preventDefault()
      await deleteMemo(context.root.$route.params.id)
      if (state.status === 200) {
        context.root.$router.push('/memos')
      }
    }

    return {
      errorsState,
      state,
      getMemoById,
      title,
      changeTitle,
      body,
      changeBody,
      onClickUpdate,
      onClickDelete,
    }
  },
})
</script>
