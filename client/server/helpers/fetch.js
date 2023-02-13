const { baseURL, version } = require('./constants')
const axios = require("axios")


const fetchOptions = (url, method, params = {}, headers = {}) => {
    if (method === 'get') {
        return axios({
            url: `${baseURL}${version}${url}`,
            method: method,
            params: params,
            headers
        })
    }

    return axios({
        url: `${baseURL}${version}${url}`,
        method: method,
        data: params,
        headers
    })
}

const get = (url, params = {}, headers = {}) => {
    return axios.get(`${baseURL}${version}${url}`, params, headers)
}

const post = (url, params = {}, headers = {}) => {
    return axios.post(`${baseURL}${version}${url}`, params, headers)
}

const put = (url, params = {}, headers = {}) => {
    return axios.put(`${baseURL}${version}${url}`, params, headers)
}


module.exports = { get, post, put, fetchOptions }