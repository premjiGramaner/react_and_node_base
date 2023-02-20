const { baseURL, version } = require('./constants')
const axios = require("axios")

const apiURL = baseURL()

const fetchOptions = (url, method, params = {}, headers = {}) => {
    if (method === 'get') {
        return axios({
            url: `${apiURL}${version}${url}`,
            method: method,
            params: params,
            headers
        })
    }

    return axios({
        url: `${apiURL}${version}${url}`,
        method: method,
        data: params,
        headers
    })
}

const get = (res, url, params = {}, headers = {}) => {

    if (res?.locals?.client_token) {
        headers.authorization = `Bearer ${res.locals.client_token}`
    }

    return axios({
        url: `${apiURL}${version}${url}`,
        method: 'get',
        params,
        headers
    })
}

const post = (res, url, data = undefined, headers = {}) => {

    if (res?.locals?.client_token) {
        headers.authorization = `Bearer ${res.locals.client_token}`
    }

    return axios({
        url: `${apiURL}${version}${url}`,
        method: 'post',
        data,
        headers
    })
}

const put = (url, params = {}, headers = {}) => {
    return axios.put(`${apiURL}${version}${url}`, params, headers)
}


module.exports = { get, post, put, fetchOptions }