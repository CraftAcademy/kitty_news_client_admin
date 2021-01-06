import axios from 'axios'
import { create } from 'cypress/types/lodash'

const createArticle = {
  async create(dispatch) {
    try {
    let response = await axios.post(`/articles`, {})
    dispatch({ type: ""})
  }
}
}