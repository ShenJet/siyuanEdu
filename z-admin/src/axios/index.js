import axios from 'axios'

    axios.create({
        baseURL: 'https://www.suwlkj.com:8888',
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' }
    })
  axios.baseURL = 'https://www.suwlkj.com:8888'
export default axios
