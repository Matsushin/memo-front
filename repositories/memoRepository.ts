import mainRepository from '@/repositories/mainRepository'

const get = async (params: any) => {
  return await mainRepository.get(`/api/v1/memos`, {
    params,
  })
}

export default {
  get,
}
