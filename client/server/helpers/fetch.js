const { baseURL, version } = require('./constants')
const axios = require("axios")

const apiURL = baseURL()

const fetchOptions = (host, url, method, params = {}, headers = {}) => {
    if (method === 'get') {
        return axios({
            url: `${host}${version}${url}`,
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

    if (res.locals.client_token) {
        headers.authorization = `Bearer ${res.locals.client_token}`
    }

    const URLItem = url.indexOf('://') > 0 ? url.replace('version', version) : `${res.locals.cluster}${version}${url}`;
    return axios({
        url: URLItem,
        method: 'get',
        params,
        headers
    })
}

const post = (res, url, data = undefined, headers = {}) => {

    if (res.locals.client_token) {
        headers.authorization = `Bearer ${res.locals.client_token}`
    }

    const URLItem = url.indexOf('://') > 0 ? url.replace('version', version) : `${res.locals.cluster}${version}${url}`;
    return axios({
        url: URLItem,
        method: 'post',
        data,
        headers
    })
}

const put = (res, url, data = undefined, headers = {}) => {

    if (res.locals.client_token) {
        headers.authorization = `Bearer ${res.locals.client_token}`
    }

    return axios({
        url: `${res.locals.cluster}${version}${url}`,
        method: 'put',
        data,
        headers
    })
}


module.exports = { get, post, put, fetchOptions }