const { routes, networkStatus } = require('../helpers/constants')
const { fetchOptions, put, get } = require('../helpers/fetch')
const {
  loginPayloadOptimize,
  optmizeReq,
  bindHeaders,
  formatResponse,
} = require('../helpers/index')

const getEdgeAppList = async (req, res, next) => {
  try {
    const query = req.query
    let url = routes.edgeApp.list + '?'

    if (query['next.pageSize']) url += `next.pageSize=${query['next.pageSize']}`

    if (query['next.pageNum']) url += `&next.pageNum=${query['next.pageNum']}`

    if (query['appName']) url += `&appName=${query['appName']}`

    if (query['projectName'])
      url += `&projectNamePattern=${query['projectName']}`

    get(res, url)
      .then(response => response)
      .then(appList => {
        formatResponse(
          res,
          200,
          appList?.data,
          'EdgeApp list fetched successfully!'
        )
      })
      .catch(err => {
        formatResponse(res, 400, err, 'Failed to get EdgeApp list!')
      })
  } catch (e) {
    console.log('fail *******', e)
    return formatResponse(
      res,
      e?.response?.data?.httpStatusCode || 400,
      e?.response?.data || {},
      'Failed to get project list!'
    )
  }
}

const getEdgeAppById = async (req, res, next) => {
  const id = req.params?.id

  if (!id) {
    return formatResponse(
      res,
      400,
      {},
      'Failed to get EdgeApp info!, App id is missing'
    )
  }

  try {
    let url = routes.edgeApp.byID + id
    get(res, url)
      .then(response => response)
      .then(appInfo => {
        const retrunData = appInfo?.data
        let IPInfo = []
        retrunData?.interfaces?.forEach(async (item, index) => {
          const ipCheck = await get(
            res,
            routes.edgeApp.localInstanceInfo.replace('{id}', item.netinstid)
          )
          if (ipCheck?.data) {
            if (ipCheck?.data?.kind === networkStatus.local) {
              if (ipCheck?.data?.assignedAdapters.length > 0) {
                const nodeInfo = await get(
                  res,
                  routes.edgeApp.deviceStatus.replace(
                    '{id}',
                    ipCheck?.data?.deviceId
                  )
                )
                if (nodeInfo?.data) {
                  IPInfo = [
                    ...IPInfo,
                    ...(nodeInfo?.data?.netStatusList || []).filter(
                      data =>
                        data.ifName === ipCheck?.data?.assignedAdapters[0].name
                    ),
                  ]
                }
              }
            } else if (ipCheck?.data?.kind === networkStatus.switch) {
              const instanceInfo = await get(
                res,
                routes.edgeApp.switchInstanceInfo.replace('{id}', id)
              )
              IPInfo = [...IPInfo, ...(instanceInfo?.data?.netStatusList || [])]
            }
          }

          if (retrunData?.interfaces.length === index + 1) {
            retrunData['ipInfo'] = IPInfo
            retrunData['network-kind'] = ipCheck?.data
              ? {
                  id: ipCheck?.data?.id || '',
                  name: ipCheck?.data?.name || '',
                  deviceId: ipCheck?.data?.deviceId || '',
                  projectId: ipCheck?.data?.projectId || '',
                  kind: ipCheck?.data?.kind || '',
                }
              : null
            formatResponse(
              res,
              200,
              retrunData,
              'EdgeApp info fetched successfully!'
            )
          }
        })
      })
      .catch(err => {
        formatResponse(res, 400, err, 'Failed to get EdgeApp info!')
      })
  } catch (e) {
    console.log('fail *******', e)
    return formatResponse(
      res,
      e?.response?.data?.httpStatusCode || 400,
      e?.response?.data || {},
      'Failed to get project list!'
    )
  }
}

const updateAppStatus = async (req, res, next) => {
  const { id, status } = req.params || {}

  if (!id) {
    return formatResponse(
      res,
      400,
      {},
      'Failed to Update Device status!, App id is missing'
    )
  }

  try {
    let url = routes.edgeApp.stateUpdate.replace('{id}', id) + status
    put(res, url)
      .then(response => response)
      .then(appInfo => {
        let resOptimized = {}
        if (
          appInfo?.data?.httpStatusCode === 200 &&
          appInfo?.data?.httpStatusMsg
        ) {
          resOptimized = { ...appInfo?.data }
          resOptimized['httpStatusMsg'] = JSON.parse(
            appInfo?.data?.httpStatusMsg
          )
        } else {
          resOptimized = appInfo?.data
        }
        formatResponse(
          res,
          200,
          resOptimized,
          'Device status Updated successfully!'
        )
      })
      .catch(err => {
        formatResponse(res, 400, err, 'Failed to Update Device status!')
      })
  } catch (e) {
    console.log('fail *******', e)
    return formatResponse(
      res,
      e?.response?.data?.httpStatusCode || 400,
      e?.response?.data || {},
      'Failed to Update Device status!'
    )
  }
}

const downloadAppScript = async (req, res, next) => {
  const id = req.params?.id

  if (!id) {
    return formatResponse(
      res,
      400,
      {},
      'Failed to download!, App id is missing'
    )
  }

  try {
    let url = routes.edgeApp.downloadScript.replace('{id}', id)
    get(res, url)
      .then(appInfo => {
        formatResponse(
          res,
          200,
          appInfo.data,
          'Script downloaded successfully!'
        )
      })
      .catch(err => {
        console.log('ewewe', err.message)
        formatResponse(res, 400, err, 'Failed to downloaded!')
      })
  } catch (e) {
    console.log('fail *******', e)
    return formatResponse(
      res,
      e?.response?.data?.httpStatusCode || 400,
      e?.response?.data || {},
      'Failed to get project list!'
    )
  }
}

module.exports = {
  getEdgeAppList,
  getEdgeAppById,
  updateAppStatus,
  downloadAppScript,
}
