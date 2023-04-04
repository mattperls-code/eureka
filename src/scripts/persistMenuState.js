const persistMenuOpened = () => sessionStorage.setItem("menu-open", "true")
const persistMenuClosed = () => sessionStorage.setItem("menu-open", "false")

const menuIsClosed = () => {
    const persistentState = sessionStorage.getItem("menu-open")

    if(persistentState == null || persistentState == "false"){
        return false
    } else {
        return true
    }
}

const persistLastPage = (page) => sessionStorage.setItem("last-page", page)

const getLastPage = () => sessionStorage.getItem("last-page")

export {
    persistMenuClosed,
    persistMenuOpened,
    menuIsClosed,
    persistLastPage,
    getLastPage
}