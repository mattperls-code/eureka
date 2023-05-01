import React, { useState, useEffect } from "react"

import { createHashRouter, redirect, RouterProvider } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import HomePage from "./pages/Home"
import GalleryPage from "./pages/Gallery"
import TimelinePage from "./pages/Timeline"
import ExplorePage from "./pages/Explore"
import BioPage from "./pages/Bio"

import "./styles.scss"

const App = () => {
    const [showNavMenu, setShowNavMenu] = useState(false)
    const [navMenuFadeOut, setNavMenuFadeOut] = useState(false)

    // unmount menu after animation
    useEffect(() => {
        let mounted = true

        if(navMenuFadeOut){
            setTimeout(() => {
                if(mounted){
                    setShowNavMenu(false)
                    setNavMenuFadeOut(false)
                }
            }, 400)
        }

        return () => mounted = false
    }, [navMenuFadeOut])
    
    // pull current page from hash
    const [currentPage, setCurrentPage] = useState(location.hash.slice(2).split("/")[0])

    // actively update rendered page on url change if necessary
    useEffect(() => {
        let mounted = true
        
        if(location.hash.slice(2) == ""){
            location.hash = "#/"
        }

        const navigationHandler = () => {
            setCurrentPage(location.hash.slice(2).split("/")[0])
            
            setTimeout(() => {
                if(mounted){
                    setNavMenuFadeOut(true)
                }
            }, 400)
        }

        addEventListener("hashchange", navigationHandler)

        return () => {
            mounted = false

            removeEventListener("hashchange", navigationHandler)
        }
    }, [])

    const inactivePageClasses = "content-font small-text inactive"
    const activePageClasses = "content-font small-text active"

    // key based hash router
    const routeScheme = {
        "": <HomePage />,
        "gallery": <GalleryPage />,
        "timeline": <TimelinePage />,
        "explore/:subject": <ExplorePage />,
        "bio/:id": <BioPage />,
        "*": () => {
            redirect("/#/")

            return null
        }
    }

    const router = createHashRouter(Object.entries(routeScheme).map(route => ({ path: route[0], element: route[1] })))

    return (
        <React.Fragment>
            <RouterProvider router={router} />
            <div className={"header-overlay"}>
                <div style={{ borderBottomLeftRadius: 10, right: 0, backgroundPositionX: "right" }} className={"rainbow-bg"} onClick={() => {
                    setShowNavMenu(true)
                }}>
                    <FontAwesomeIcon className={"small-text"} icon={faBars} />
                </div>
            </div>
            {
                // overlay menu on user open
                showNavMenu && (
                    <div className={"nav-menu-wrapper"}>
                        <div className={navMenuFadeOut ? "slide-out" : ""}>
                            <div className={"nav-menu-container"}>
                                <div className={"back-container"} onClick={() => setNavMenuFadeOut(true)}>
                                    <FontAwesomeIcon className={"small-text"} icon={faChevronLeft} />
                                    <div style={{ marginLeft: "16px" }} className={"header-font small-text"}>Back</div>
                                </div>
                                <div className={"nav-links-container"}>
                                    <a href={"/#/"} className={"nav-link-container"}>
                                        <label className={currentPage == "" ? activePageClasses : inactivePageClasses}>Home</label>
                                    </a>
                                    <a href={"/#/gallery"} className={"nav-link-container"}>
                                        <label className={currentPage == "gallery" ? activePageClasses : inactivePageClasses}>Gallery</label>
                                    </a>
                                    <a href={"/#/timeline"} className={"nav-link-container"}>
                                        <label className={currentPage == "timeline" ? activePageClasses : inactivePageClasses}>Timeline</label>
                                    </a>
                                    <a href={"/#/explore/all"} className={"nav-link-container"}>
                                        <label className={currentPage == "explore" ? activePageClasses : inactivePageClasses}>Explore</label>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default App