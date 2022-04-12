import { rewriteRouter } from './rewrite-router'
import { handleRouter, handleApp } from './handle-router'

// app格式
// [{
//     name: 'react16',
//     entry: '//localhost:7100',
//     container: '#subapp-viewport',
//     loader,
//     activeRule: '/react16',
// }]
let _app = []

export const getApps = () => _app

/**
 * 注册微应用
 */
export const registerMicroApps = (app) => {
    _app = app
    console.log(app)
}

/**
 * 默认运行机制
 * 即监听路由变化，触发 handleRouter 匹配 app，加载渲染该 app
 */
export const start = (config) => {
    // 微前端运行原理
    // 1. 监视路由变化
    rewriteRouter()
    // 1.1 初始处理当前路由
    handleRouter()

    // 2. 匹配子应用（路由变动后匹配）

    // 3. 加载子应用（使用import-html加载）

    // 4. 渲染子应用（加载后调用子应用注册的qiankun钩子）
}

/**
 * 组件方式运行
 */
export const loadMicroApp = (app, config) => {
    // 手动加载渲染子应用
    handleApp(app)
}