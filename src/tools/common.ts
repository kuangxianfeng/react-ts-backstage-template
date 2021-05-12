import { message } from 'antd'
import { AxiosRequestConfig } from 'axios';
/**
 * 服务于request.ts中的错误消息弹窗处理
 */
let isMessageFlag = true
export const errorRequestMessage = (content: string): void => {
    if (isMessageFlag) {
        isMessageFlag = false
        message.error({
            content,
            onClose: () => {
                isMessageFlag = true
            }
        })
    }
}


/**
 * 将当前请求的url和参数合并在一起
 * @param {AxiosRequestConfig} config axios request的config对象
 */
export const concatRequestParams = (config: AxiosRequestConfig): string | null => {
    const { url, method, params, data } = config;
    if (method === 'get' && params) {
        let str = ''
        Object.keys(params).forEach((item, idx, arr) => {
            str += `${item}=${params[item]}${idx === arr.length - 1 ? '' : '&'}`
        })
        return `${url} ${str}`
    }
    if (method === 'post' && data) {
        return `${url} ${data}`
    }
    return url
}