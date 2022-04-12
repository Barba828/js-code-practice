import { importHTML } from "./import-html"
// import importHTML from "import-html-entry"
import { getApps } from "./index"
import { getNextRoute, getPrevRoute } from './rewrite-router'

/**
 * 处理路由变化
 */
export const handleRouter = async () => {
    const apps = getApps()

    // 匹配上一个应用
    const prevApp = apps.find(item => getPrevRoute().startsWith(item.activeRule))


    // 2. 匹配子应用
    const app = apps.find(item => getNextRoute().startsWith(item.activeRule))
    // const app = apps.find(item => window.location.pathname.startsWith(item.activeRule))

    if (prevApp) {
        console.log(prevApp);
        prevApp.unmount && prevApp.unmount()
    }

    if (!app) {
        return
    }

    // 3. 加载子应用
    await handleApp(app)
}

/**
 * 加载渲染子应用
 */
const handleApp = async (app) => {
    const container = document.querySelector(app.container)
    const { template, getExternalScript, execScripts } = await importHTML(app.entry)
    console.log(template, execScripts())
    container.appendChild(template)

    // 配置全局环境变量（子应用需要）
    // 声明qiankun环境，即为子应用的运行环境准备
    window.__POWERED_BY_QIANKUN__ = true
    // 声明__webpack_public_path__，处理子应用的资源加在路径
    window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry + '/'

    const appExports = await execScripts()
    app.bootstrap = appExports.bootstrap
    app.mount = appExports.mount
    app.unmount = appExports.unmount

    // 4. 渲染子应用
    await bootstrap(app)
    await mount(app)
}

const bootstrap = async (app) => {
    app.bootstrap && (await app.bootstrap())
}

const mount = async (app) => {
    app.mount && (await app.mount({
        container: document.querySelector(app.container),
        onGlobalStateChange: () => { },
        setGlobalState: () => { },
    }))
}

const unmount = async (app) => {
    app.unmount && (await app.unmount())
}