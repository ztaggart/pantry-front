import axios from 'axios'

let baseUrl = null
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const setBaseUrl = url => {
    baseUrl = url
}

const getAll = () => {
    return axios.get(baseUrl)
}

const getById = (id) => {{
    return axios.get(`${baseUrl}/${id}`)
}}

const getAllForUser = (userid) => {
    return axios.get(`${baseUrl}?userid=${userid}`)
}

const create = async (newObject) => {
    const config = {
        headers: {Authorization: token}
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = async (id) => {
    const config = {
        headers: {Authorization: token}
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data
}

export default { 
  getAll, getAllForUser, getById, create, update, remove, setToken, setBaseUrl
}