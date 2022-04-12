import { fetchResource } from "./fetch-resource"

/**
 * 参考：https://github.com/kuitos/import-html-entry
 * 从 app.entry 请求子应用资源：HTML、JS、CSS
 */
export const importHTML = async (url) => {
    const html = await fetchResource(url)
    const template = document.createElement('div')
    template.innerHTML = html

    const scripts = template.querySelectorAll('script')
    // 获取所有 script 标签代码
    const getExternalScript = () => {
        return Promise.all(Array.from(scripts).map((script) => {
            const src = script.getAttribute('src')
            if (!src) {
                return Promise.resolve(script.innerHTML)
            } else {
                const scriptUrl = src.startsWith('http') ? src : `${url}/${src}`
                return fetchResource(scriptUrl)
            }
        }))
    }

    // 获取并执行 script 标签代码
    const execScripts = async () => {
        const scripts = await getExternalScript()

        // 当前作用域提供一个CommonJS环境，用于eval执行代码时导出module.export
        const module = { exports: {} }
        const exports = module.exports

        scripts.forEach(code => {
            // 将script里的模块注入到上文module中
            eval(code)
        })

        return module.exports
    }

    return {
        template,
        getExternalScript,
        execScripts
    }
}