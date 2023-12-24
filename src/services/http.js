import axios from 'axios'

export async function checkHttpService (url) {
  try {
    await axios.get(url)
    return true
  } catch (error) {
    return false
  }
}
