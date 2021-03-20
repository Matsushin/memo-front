import axios from 'axios'
import axiosCaseConvert from '@/utils/axiosCaseConvert'

const http = axios.create({
  ...axiosCaseConvert,
})

export default http
