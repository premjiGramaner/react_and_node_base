export const reviseData = (response: any) => {
  try {
    if (response.status === 400 || response.status === 424) {
      return {
        data: response?.data,
        error: true,
        statusCode: response.status,
        message: response?.data?.message || '',
        errors: response?.data?.errors || [],
      }
    } else if (response.status === 204) {
      return {
        data: null,
        error: true,
        errors: response?.data?.errors || [],
      }
    } else if (response.status === 200) {
      const reqData = response ? response : response?.data
      return {
        data: reqData?.data,
        error: false,
        message: reqData?.message,
        statusCode: reqData?.responseCode || reqData?.status,
      }
    } else if (response && response.hasOwnProperty('data')) {
      const reqData = response?.data?.data ? response?.data : response
      return {
        data: reqData?.data,
        error: false,
        message: reqData?.message,
        statusCode: reqData?.responseCode || reqData?.status,
      }
    } else {
      return {
        error: true,
        data: response?.error?.response || 'Please try again',
      }
    }
  } catch (e: any) {
    return { error: true, data: e?.error?.response || 'Please try again' }
  }
}
