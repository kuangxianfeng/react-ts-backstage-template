import { UploadFile } from 'antd/es/upload/interface';
import axios, { AxiosInstance, AxiosPromise, CancelTokenSource, Canceler } from 'axios'
import qs from 'qs'
import { concatRequestParams, errorRequestMessage } from 'tools/common'
import { ObjectTypes } from '../typing';

type pendingRequestTypes = {
    requestMark: string,
    cancel: Canceler
}
const pendingRequest: pendingRequestTypes[] = [];// 存放请求正在进行中状态

const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_AJAX,
    timeout: 10 * 1000,
    headers: {
        post: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    },
})
// 请求拦截器
instance.interceptors.request.use(config => {
    // 添加唯一的token
    const cancelSource: CancelTokenSource = axios.CancelToken.source();
    config.cancelToken = cancelSource.token;
    const requestMark = concatRequestParams(config)

    // 先判断当前请求是否存在于数组，不存在才push
    const markIndex = pendingRequest.findIndex(item => item.requestMark === requestMark);
    if (markIndex > -1) {
        pendingRequest[markIndex].cancel()
        pendingRequest.slice(markIndex, 1)
    } else {
        pendingRequest.push({
            requestMark,
            cancel: cancelSource.cancel
        })
    }
    const rlb = document.querySelector('.region-loading-box')
    if (pendingRequest.length === 1 && rlb && (rlb.className === 'region-loading-box' || rlb.className === 'region-loading-box hide')) {
        rlb.className = 'region-loading-box show'
    }
    return config
})

// 响应拦截器
instance.interceptors.response.use(response => {
    const requestMark = concatRequestParams(response.config)
    const markIndex = pendingRequest.findIndex(item => item.requestMark === requestMark);
    const responseData = response.data;
    switch (responseData.code) {
        case 401:
            // 无权限
            window.location.replace('/#/login')
            break;
        case 200:
            break;
        default:
            break
    }
    // 到最后删除
    markIndex > -1 && pendingRequest.splice(markIndex, 1);
    return response
}, error => {
    console.log(error)
    if (error.message && error.message.includes('timeout')) {
        errorRequestMessage('请求服务器超时，请稍后再试')
    }
    if (error.response) {
        const code = error.response.status;
        if (code === 404) {
            errorRequestMessage('请求服务器错误，未找到该资源，请稍后再试！')
        } else if (code === 500) {
            errorRequestMessage('服务端错误，请稍后再试')
        }
    }

})

type PostTypes = {
    (url: string, data?: ObjectTypes, flag?: boolean): AxiosPromise
}
export const httpPost: PostTypes = (url, data, flag = true) => new Promise((resolve, reject) => {
    instance.post(url, flag ? qs.stringify(data) : data)
        .then(res => resolve(res))
        .catch(error => reject(error))
})

export const httpGet = (url: string, params?: ObjectTypes): AxiosPromise => new Promise((resolve, reject) => {
    instance.get(url, {
        params,
    })
        .then(res => resolve(res))
        .catch(error => reject(error))
});

type httpFormDataTypes = {
    (url: string, params: UploadFile[] | FormData): AxiosPromise
}
export const httpFormData: httpFormDataTypes = (url, params) => new Promise((resolve, reject) => {
    const formData = new FormData();
    Object.keys(params).forEach(item => {
        formData.append('file', params[item])
    })
    instance.post(url, formData)
        .then(res => {
            resolve(res);
        })
        .catch(error => reject(error))
});

export const httpDownload = (url: string, params?: ObjectTypes): any => new Promise((resolve, reject) => {
    instance.post(
        url,
        params,
        {
            responseType: 'blob'
        }
    ).then(res => {
        resolve(res)
    }).catch(error => reject(error))
})
