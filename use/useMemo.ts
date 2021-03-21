import { reactive, SetupContext } from '@vue/composition-api'
import { RepositoryFactory } from '@/repositories/repositoryFactory'
import useInputText from '@/use/useInputText'
import Validator from 'validatorjs'

const MemoRepository = RepositoryFactory.get('memo')

const useMemo = ({ root }: SetupContext, isPc: boolean) => {
  const state = reactive({
    memos: [],
    memo: {},
    status: null,
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

  const getMemoById = async (id: number) => {
    try {
      const response = await MemoRepository.getById(id)
      state.memo = response.data
    } catch (error) {
      const { status, statusText } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    }
  }

  const createMemo = async (params: {}) => {
    try {
      const response = await MemoRepository.create(params)
      state.memo = response.data
      state.status = response.status
    } catch (error) {
      const { status, statusText } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    }
  }

  const updateMemo = async (id: number, params: {}) => {
    try {
      const response = await MemoRepository.update(id, params)
      state.memo = response.data
      state.status = response.status
    } catch (error) {
      const { status, statusText } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    }
  }

  const deleteMemo = async (id: number) => {
    try {
      const response = await MemoRepository.deleteById(id)
      state.memo = response.data
      state.status = response.status
    } catch (error) {
      const { status, statusText } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    }
  }

  const { state: title, change: changeTitle } = useInputText('')
  const { state: body, change: changeBody } = useInputText('')

  const rules: any = {
    title: 'required|max:20',
    body: 'required',
  }

  const messages = {
    'required.title': 'タイトルを入力してください',
    'max.title': 'タイトルは20文字以内で入力してください',
    'required.body': '本文を入力してください',
  }

  const errorsState = reactive({
    message: {},
  })

  const getParams = () => {
    errorsState.message = {}
    const params: any = {
      title: title.inputtedValue,
      body: body.inputtedValue,
    }
    const validate = new Validator(
      params,
      rules,
      messages
    )

    return {
      validate,
      params,
    }
  }

  return {
    state,
    getMemos,
    getMemoById,
    createMemo,
    updateMemo,
    deleteMemo,
    title,
    changeTitle,
    body,
    changeBody,
    errorsState,
    getParams,
  }
}
export default useMemo
