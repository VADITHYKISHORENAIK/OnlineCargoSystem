const { default: axios } = require("axios")
const { get } = require("lodash")
const logger = require("./logger")

module.exports = () => {

    // axios.interceptors.request.use(request => {
    //     try {
    //         logger.info(`API call to ${request.method} ${request.url} | Data: ${stringifyJson(request.data)}`)
    //     } catch (error) {
    //         logger.error('Error logging S2S request: ' + error.message)
    //         logger.error(error)
    //     }

    //     return request
    // })

    axios.interceptors.response.use(response => {
        try {
            // logger.info(`API response from ${get(response, 'config.url')} | StatusCode: ${get(response, 'status')} | Data: ${stringifyJson(get(response, 'data'))}`)
            logger.info({
                msg:'API call response',
                url: `${get(response, 'config.method')} ${get(response, 'config.url')}`,
                requestBody: get(response, 'config.data'),
            })
        } catch (error) {
            logger.error('Error logging S2S response: ' + error.message)
            logger.error(error)
        }
        return response
    }, error => {
        try {
            // logger.info(`API error from ${get(error, 'config.url')} | Status: ${get(error, 'response.status')} - ${get(error, 'response.statusText')} | Data: ${stringifyJson(get(error, 'response.data'))}`)
            logger.info({
                msg:'Error calling API',
                url: `${get(error, 'config.method')} ${get(error, 'config.url')}`,
                requestBody: get(error, 'config.data'),
                responseData: get(error, 'data'),
                responseStatus: `${get(error, 'response.status')} - ${get(error, 'response.statusText')}`
            })
        } catch (error) {
            logger.error('Error logging S2S error: ' + error.message)
            logger.error(error)
        }
        return Promise.reject(error);
    })
}
