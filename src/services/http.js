import axios from 'axios'

export async function checkHttp (url) {
  try {
    await axios.get(url)
    return true
  } catch (error) {
    return false
  }
}
