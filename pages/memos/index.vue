<template>
  <div>
    <h3>メモ一覧</h3>
    <nuxt-link :to="`memos/new`">新規登録</nuxt-link>
    <table class="table-template-sets table-fixed no-bordered bg-colored">
      <thead>
        <tr>
          <th>タイトル</th>
          <th>内容</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="memo in state.memos" :key="memo.id">
          <td class="t-truncate">{{ memo.title }}</td>
          <td class="t-truncate text-right">
            {{ memo.body }}
          </td>
          <td class="t-truncate">
            <nuxt-link :to="`memos/${memo.id}`" class="button-detail">
              編集
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from '@vue/composition-api'
import useMemo from '@/use/useMemo'

export default defineComponent({
  setup(_, context: SetupContext) {
    const { state, getMemos } = useMemo(context, true)

    onMounted(async () => {
      await getMemos()
    })

    return {
      state,
      getMemos,
    }
  },
})
</script>
