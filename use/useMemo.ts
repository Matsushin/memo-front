import { reactive, SetupContext } from '@vue/composition-api'
import { RepositoryFactory } from '@/repositories/repositoryFactory'

const MemoRepository = RepositoryFactory.get('memo')

const useMemo = ({ root }: SetupContext, isPc: boolean) => {
  const state = reactive({
    memos: [],
  })

  const getMemos = async () => {
    try {
      const response = await MemoRepository.get()
      state.memos = response.data
    } catch (error) {
      const { status, statusText } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    }
  }
  return {
    state,
    getMemos,
  }
}
export default useMemo
