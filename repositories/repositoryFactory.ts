import memoRepository from '@/repositories/memoRepository'

const repositories: any = {
  memo: memoRepository,
}

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
}
