// 导入axios
import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 20000,
})

// 配置拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return res.data
    } else {
      console.error('错误处理...')
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 导出实例
export default instance
