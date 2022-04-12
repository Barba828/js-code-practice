import { handleRouter } from "./handle-router"

let prevState = ''
let nextState = window.location.pathname

export const getPrevRoute = () => prevState
export const getNextRoute = () => nextState

/**
*   hash路由：window.onhashchange
*   history路由：
*      1.切换(back,forward,go): window.onpopstate
*      2.修改(pushState,replaceState): 劫持pushState、replaceState
*   每次修改维护两个变量，prevState和nextState，用以卸载上一个微应用
*/
export const rewriteRouter = () => {
    window.addEventListener('hashchange', () => {
        prevState = nextState
        nextState = window.location.pathname

        handleRouter()
    })

    window.addEventListener('popstate', () => {
        prevState = nextState
        nextState = window.location.pathname

        handleRouter()
    })

    const rawPushState = window.history.pushState
    window.history.pushState = (...args) => {
        prevState = window.location.pathname
        rawPushState.apply(window.history, args)
        nextState = window.location.pathname

        handleRouter()
    }

    const rawReplaceState = window.history.replaceState
    window.history.replaceState = (...args) => {
        prevState = window.location.pathname
        rawReplaceState.apply(window.history, args)
        nextState = window.location.pathname

        handleRouter()
    }
}