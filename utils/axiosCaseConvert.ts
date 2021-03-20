import camelCase from 'lodash.camelcase'
import snakeCase from 'lodash.snakecase'
import qs from 'qs'
import deepMapKeys from '@/utils/deepMapKeys'
import axios from 'axios'

const axiosCaseConvert = {
  // レスポンスをcamelCaseに変換
  // axiosのデフォルト処理に追加するために、concatで配列の最後に追加する。
  // (※ pushするとすべてのインスタンスの共通処理が変わってしまう)
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data: any, headers: any) => {
      if (
        !headers['content-type'] ||
        !headers['content-type'].includes('application/json')
      ) {
        return data
      }
      return deepMapKeys(data, (_val: any, key: string) => {
        return camelCase(key)
      })
    },
  ],

  // リクエストをsnake_caseに変換
  // こちらはaxiosのデフォルト処理がJSONをstringifyする前に実行したいので、配列の最初に追加する。
  transformRequest: [
    (data: any, _headers: any) => {
      if (data instanceof FormData) {
        return data
      }
      return deepMapKeys(data, (_val: any, key: string) => {
        return snakeCase(key)
      })
    },
    ...axios.defaults.transformRequest,
  ],

  // GETリクエストのパラメーターもsnake_caseに変換。
  paramsSerializer(params: any) {
    return qs.stringify(
      deepMapKeys(params, (_val: any, key: string) => {
        return snakeCase(key)
      }),
      { arrayFormat: 'brackets' }
    )
  },
}
export default axiosCaseConvert
