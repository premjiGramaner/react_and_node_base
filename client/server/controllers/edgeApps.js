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
    let canQuery = false;
    let url = routes.edgeApp.list + '?'

    if (query['next.pageSize']) url += `next.pageSize=${query['next.pageSize']}`

    if (query['next.pageNum']) url += `&next.pageNum=${query['next.pageNum']}`

    if (query['appName']) url += `&appName=${query['appName']}`

    if (query['deviceName']) url += `&deviceNamePattern=${query['deviceName']}`

    if (query['projectName'])
      url += `&projectNamePattern=${query['projectName']}`

    if (query['next.pageNum'] && query['next.pageNum'] == 1) {
      canQuery = true;
    }

    get(res, url).then(response => response).then(appList => {
      const resAppList = appList.data, tags = [];

      let loopDataCount = 0
      resAppList.list.forEach(async item => {
        try {
          let tagsData = await get(res, routes.edgeApp.deviceStatus.replace('{id}', item.deviceId));
          await delay(800)
          if (tagsData && tagsData.data && tagsData.data && tagsData.data.tags) {
            const tTags = tagsData.data.tags;
            Object.keys(tTags).forEach((tag) => {
              if (tag && tTags[tag]) {
                const ip = tTags[tag] || '';
                const ipArray = ip.slice(ip.indexOf('/') + 1).split(':') || []
                if (ipArray.length === 2 && !tags.some(item => item.ipAddrs === ipArray[0] && item.appPort === ipArray[1])) {
                  tags.push({
                    isTagInfo: true,
                    name: tag,
                    appType: 'external',
                    appName: '-',
                    deviceId: item.deviceId,
                    deviceName: item.deviceName,
                    runState: 'RUN_STATE_ONLINE',
                    ipAddrs: ipArray[0],
                    protocol: ip.slice(0, ip.indexOf('/')),
                    appPort: ipArray[1],
                    lport: "",
                  })
                }
              }
            });
          }

          loopDataCount += 1
        } catch (error) {
          loopDataCount += 1
        }

        if (resAppList.list.length === loopDataCount) {
          const finalresult = resAppList
          if (canQuery) {
            finalresult['list'] = [...resAppList.list, ...tags]
          } else {
            finalresult['list'] = [...resAppList.list]
          }
          finalresult.summaryByState.total = finalresult.list.length
          finalresult.totalCount = resAppList.totalCount + tags.length;
          formatResponse(res, 200, finalresult, 'EdgeApp list fetched successfully!')
        }
      })
    }).catch(err => {
      console.log('=== Error on getting tags: ', err)
      formatResponse(res, 400, err, 'Failed to get EdgeApp list!')
    })
  } catch (e) {
    console.log('fail *******', e)
    return formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, 'Failed to get project list!')
  }
}

const delay = timeToWait => new Promise(resolve => setTimeout(resolve, timeToWait))
const getEdgeAppById = async (req, res, next) => {
  const id = req.params.id

  if (!id) {
    return formatResponse(res, 400, {}, 'Failed to get EdgeApp info!, App id is missing')
  }

  try {
    let url = routes.edgeApp.byID + id;
    get(res, url).then(response => response).then(appInfo => {
      const retrunData = appInfo.data
      let loopDataCount = 0
      if (!retrunData.interfaces.length) {
        formatResponse(res, 200, retrunData, 'EdgeApp info fetched successfully!')
      } else {
        retrunData.interfaces.forEach(async (item, index) => {
          let IPInfo = null, nodeInfo = null
          let ipCheck = await get(res, routes.edgeApp.localInstanceInfo.replace('{id}', retrunData.interfaces[index].netinstid))
          await delay(1000)
          if (ipCheck.data) {
            if (ipCheck.data.kind === networkStatus.local) {
              if (ipCheck.data.assignedAdapters.length > 0) {
                if (!nodeInfo)
                  nodeInfo = await get(res, routes.edgeApp.endgeInstanceInfo.replace('{id}', id))
                if (nodeInfo.data) {
                  IPInfo = (nodeInfo.data.netStatusList || []).find(data => data.ifName === item.intfname)
                  if (IPInfo)
                    IPInfo = {
                      ...IPInfo,
                      isMemberActive: IPInfo.ifName === ipCheck.data.assignedAdapters[0].name,
                    }
                }
              }
            } else if (ipCheck.data.kind === networkStatus.switch) {
              const instanceInfo = await get(res, routes.edgeApp.endgeInstanceInfo.replace('{id}', id))
              IPInfo = instanceInfo.data.netStatusList || []
            }

            item['ipInfo'] = IPInfo
            item['network-kind'] = ipCheck.data ?
              {
                id: ipCheck.data.id || '',
                name: ipCheck.data.name || '',
                deviceId: ipCheck.data.deviceId || '',
                projectId: ipCheck.data.projectId || '',
                kind: ipCheck.data.kind || '',
              } : null
            loopDataCount += 1
          }
          ipCheck = null
          if (retrunData.interfaces.length === loopDataCount) {
            formatResponse(res, 200, retrunData, 'EdgeApp info fetched successfully!')
          }
        })
      }
    }).catch(err => {
      formatResponse(res, 400, err, 'Failed to get EdgeApp info!')
    })
  } catch (e) {
    console.log('fail *******', e)
    return formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, 'Failed to get project list!')
  }
}

const updateAppStatus = async (req, res, next) => {
  const { id, status } = req.params || {}

  if (!id) {
    return formatResponse(res, 400, {}, 'Failed to Update Device status!, App id is missing')
  }

  try {
    let url = routes.edgeApp.stateUpdate.replace('{id}', id) + status
    put(res, url).then(response => response).then(appInfo => {
      let resOptimized = {}
      if (appInfo.data.httpStatusCode === 200 && appInfo.data.httpStatusMsg) {
        resOptimized = { ...appInfo.data }
        resOptimized['httpStatusMsg'] = JSON.parse(appInfo.data.httpStatusMsg)
      } else {
        resOptimized = appInfo.data
      }
      formatResponse(res, 200, resOptimized, 'Device status Updated successfully!')
    }).catch(err => {
      formatResponse(res, 400, err, 'Failed to Update Device status!')
    })
  } catch (e) {
    console.log('fail *******', e)
    return formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, 'Failed to Update Device status!')
  }
}

const downloadAppScript = async (req, res, next) => {
  const id = req.params.id

  if (!id) {
    return formatResponse(res, 400, {}, 'Failed to download!, App id is missing')
  }

  try {
    let url = routes.edgeApp.downloadScript.replace('{id}', id)
    get(res, url).then(appInfo => {
      formatResponse(
        res,
        200,
        appInfo.data,
        'Script downloaded successfully!'
      )
    }).catch(err => {
      console.log('ewewe', err.message)
      formatResponse(res, 400, err, 'Failed to downloaded!')
    })
  } catch (e) {
    console.log('fail *******', e)
    return formatResponse(res, e.response.data.httpStatusCode || 400, e.response.data || {}, 'Failed to get project list!')
  }
}

module.exports = {
  getEdgeAppList,
  getEdgeAppById,
  updateAppStatus,
  downloadAppScript,
}
