import mainRepository from '@/repositories/mainRepository'

const get = async (params: any) => {
  return await mainRepository.get(`/api/v1/memos`, {
    params,
  })
}

const update = async (id: number, params: any) => {
  return await mainRepository.put(`/api/v1/memos/${id}`, {
    ...params,
  })
}

const getById = async (id: number) => {
  return await mainRepository.get(`/api/v1/memos/${id}`)
}

const deleteById = async (id: number) => {
  return await mainRepository.delete(`/api/v1/memos/${id}`)
}

export default {
  get,
  update,
  getById,
  deleteById,
}
