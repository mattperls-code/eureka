import React, { useState, useEffect } from "react"

import FadeIn from "../components/FadeIn"
import ScrollTracker from "../components/ScrollTracker"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"

const HomePage = () => {
    const [showInitialWrapper, setShowInitialWrapper] = useState(true)

    useEffect(() => {
        let mounted = true

        setTimeout(() => {
            if(mounted){
                setShowInitialWrapper(false)
            }
        }, 4800)

        return () => mounted = false
    }, [])

    return (
        showInitialWrapper ? (
            <React.Fragment>
                <div className={"initial-fading-wrapper"}>
                    <div style={{ position: "relative", width: "100vw", height: "50vh" }}>
                        <header className={"header-font large-text"}>Eureka</header>
                    </div>
                    <div className={"content-font small-text"} style={{ height: "50vh", padding: "0 20px", textAlign: "center" }}> - the greatest minds throughout history - </div>
                    <div className={"rainbow-hr"} />
                </div>
            </React.Fragment>
        ) : (
            <div style={{ width: "100vw", height: "100vh", overflowY: "scroll" }}>
                <div style={{ width: "100vw", minHeight: "100vh" }}>
                    <FadeIn>
                        <div style={{ marginTop: "20px", marginBottom: "40px" }} className={"home-page-header-container"}>
                            <header style={{ backgroundSize: "600px 130px" }} className={"home-page-header-text header-font medium-text"}>Welcome to Eureka</header>
                        </div>
                    </FadeIn>
                    <FadeIn delay={"200ms"}>
                        <div className={"home-page-info-container"}>
                            <div className={"content-font small-text"}>
                                Eureka aims to recognize, celebrate, and draw inspiration from the greatest minds throughout history.
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={"400ms"}>
                        <div className={"home-page-info-container"}>
                            <div className={"content-font small-text"}>
                                The project focuses on a variety of academia, covering the best minds both artistically and analytically.
                            </div>
                        </div>
                    </FadeIn>
                </div>
                <ScrollTracker realScrollHeight={1200} TrackingComponent={({ progress }) => {
                    const translateX = -25 * Math.min(Math.floor(progress / 0.25), 3)

                    return (
                        <div className={"sticky-content"}>
                            <FadeIn>
                                <div className={"home-page-header-container"}>
                                    <header style={{ backgroundSize: "750px 130px" }} className={"home-page-header-text header-font medium-text"}>Virtual Gallery</header>
                                </div>
                            </FadeIn>
                            <FadeIn>
                                <div className={"display-container"}>
                                    <div style={{ transform: `translateX(${translateX}%)` }} className={"images"}>
                                        <div style={{ backgroundImage: "url(/assets/images/previews/gallery1.png)" }} className={"img"} />
                                        <div style={{ backgroundImage: "url(/assets/images/previews/gallery2.png)" }} className={"img"} />
                                        <div style={{ backgroundImage: "url(/assets/images/previews/gallery3.png)" }} className={"img"} />
                                        <div style={{ backgroundImage: "url(/assets/images/previews/gallery4.png)" }} className={"img"} />
                                    </div>
                                </div>
                            </FadeIn>
                            <FadeIn threshold={1.0}>
                                <a href={"/#/gallery"} className={"link-container content-font small-text"}>Visit Gallery</a>
                            </FadeIn>
                        </div>
                    )
                }} />
                <ScrollTracker realScrollHeight={1200} TrackingComponent={({ progress }) => {
                    const translateX = -100 * (3 / 4) + 25 * Math.min(Math.floor(progress / 0.25), 3)

                    return (
                        <div className={"sticky-content"}>
                            <FadeIn>
                                <div className={"home-page-header-container"}>
                                    <header style={{ backgroundSize: "800px 130px" }} className={"home-page-header-text header-font medium-text"}>Historic Timeline</header>
                                </div>
                            </FadeIn>
                            <FadeIn>
                                <div className={"display-container"}>
                                    <div style={{ transform: `translateX(${translateX}%)` }} className={"images"}>
                                        <div style={{ backgroundImage: "url(/assets/images/default.jpg)" }} className={"img"} />
                                        <div style={{ backgroundImage: "url(/assets/images/default.jpg)" }} className={"img"} />
                                        <div style={{ backgroundImage: "url(/assets/images/default.jpg)" }} className={"img"} />
                                        <div style={{ backgroundImage: "url(/assets/images/default.jpg)" }} className={"img"} />
                                    </div>
                                </div>
                            </FadeIn>
                            <FadeIn threshold={1.0}>
                                <a href={"/#/timeline"} className={"link-container content-font small-text"}>Visit Timeline</a>
                            </FadeIn>
                        </div>
                    )
                }} />
                <ScrollTracker realScrollHeight={600} TrackingComponent={({ progress }) => {
                    const offset = -100 * Math.min(Math.floor(progress * 3), 2) / 3
                    const altOffset = -100 * (2 / 3) - offset

                    return (
                        <div className={"sticky-content"}>
                            <FadeIn>
                                <div className={"home-page-header-container"}>
                                    <header style={{ backgroundSize: "850px 130px" }} className={"home-page-header-text header-font medium-text"}>Explore Disciplines</header>
                                </div>
                            </FadeIn>
                            <div style={{ display: "display: flex", width: "calc(min(100vw, 1200px))" }} className={"display-container"}>
                                <div className={"subject-wrapper"}>
                                    <FadeIn>
                                        <div className={"subject-container"}>
                                            <div style={{ transform: `translateY(${offset}%)` }} className={"vertical-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/picasso.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/davinci.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/dali.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Art</div>
                                        </div>
                                    </FadeIn>
                                </div>
                                <div className={"subject-wrapper"}>
                                    <FadeIn>
                                        <div className={"subject-container"}>
                                            <div style={{ transform: `translateX(${offset}%)` }} className={"horizontal-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/euler.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/newton.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/lovelace.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Mathematics</div>
                                        </div>
                                    </FadeIn>
                                </div>
                                <div className={"subject-wrapper"}>
                                    <FadeIn>
                                        <div className={"subject-container"}>
                                            <div style={{ transform: `translateY(${altOffset}%)` }} className={"vertical-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/default.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/mozart.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/beethoven.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Music</div>
                                        </div>
                                    </FadeIn>
                                </div>
                                <div className={"subject-wrapper"}>
                                    <FadeIn>
                                        <div className={"subject-container"}>
                                            <div style={{ transform: `translateX(${altOffset}%)` }} className={"horizontal-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/darwin.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/einstein.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/pasteur.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Science</div>
                                        </div>
                                    </FadeIn>
                                </div>
                                <div className={"subject-wrapper"}>
                                    <FadeIn>
                                        <div className={"subject-container"}>
                                            <div style={{ transform: `translateY(${offset}%)` }} className={"vertical-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/aristotle.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/confucius.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/locke.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Philosophy</div>
                                        </div>
                                    </FadeIn>
                                </div>
                                <div className={"subject-wrapper"}>
                                    <FadeIn>
                                        <div className={"subject-container"}>
                                            <div style={{ transform: `translateX(${offset}%)` }} className={"horizontal-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/shakespeare.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/austen.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/douglass.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Literature</div>
                                        </div>
                                    </FadeIn>
                                </div>
                            </div>
                            <FadeIn threshold={1.0}>
                                <a href={"/#/explore"} className={"link-container content-font small-text"}>Visit Explore</a>
                            </FadeIn>
                        </div>
                    )
                }} />
                <FadeIn threshold={1.0}>
                    <hr />
                </FadeIn>
                <div className={"footer-container"}>
                    <FadeIn threshold={1.0}>
                        <div style={{ paddingRight: "20px" }} className={"content-font small-text"}>© 2023 Matthew Perlman</div>
                    </FadeIn>
                    <div>
                        <FadeIn className={"icon"} threshold={1.0}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </FadeIn>
                        <FadeIn className={"icon"} threshold={1.0}>
                            <FontAwesomeIcon icon={faGithub} />
                        </FadeIn>
                        <FadeIn className={"icon"} threshold={1.0}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </FadeIn>
                    </div>
                </div>
            </div>
        )
    )
}

export default HomePage