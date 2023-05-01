import React, { useState, useEffect } from "react"

import Tilty from "react-tilty"

import FadeIn from "../components/FadeIn"
import ScrollTracker from "../components/ScrollTracker"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"

const HomePage = () => {
    const [showInitialWrapper, setShowInitialWrapper] = useState(true)

    // have overlay mounted until animation finishes
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
                    <FadeIn threshold={1.0}>
                        <div className={"home-page-header-container"}>
                            <header style={{ backgroundSize: "600px 130px" }} className={"home-page-header-text header-font medium-text"}>Welcome to Eureka</header>
                        </div>
                    </FadeIn>
                    <FadeIn delay={"200ms"} threshold={1.0}>
                        <div className={"home-page-info-container"}>
                            <div className={"content-font small-text"}>
                                Eureka aims to recognize, celebrate, and draw inspiration from the greatest minds throughout history.
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={"400ms"} threshold={1.0}>
                        <div className={"home-page-info-container"}>
                            <div className={"content-font small-text"}>
                                The project focuses on a variety of academia, covering the best minds both creatively and analytically.
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={"600ms"} threshold={1.0}>
                        <div style={{ fontSize: "18px",  marginTop: "56px", textAlign: "center" }} className={"content-font"}>Learn More</div>
                    </FadeIn>
                    <FadeIn delay={"800ms"} threshold={1.0}>
                        <img className={"scroll-indicator"} src={"/assets/images/mouse/scroll.svg"} />
                    </FadeIn>
                </div>
                <FadeIn>
                    <hr />
                </FadeIn>
                <ScrollTracker realScrollHeight={800} TrackingComponent={({ progress }) => {
                    // translate the content of this section to add a horizontal parallax scroll effect
                    const translateX = -25 * (3 * progress)

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
                                        <Tilty reverse max={15}>
                                            <div style={{ backgroundImage: "url(/assets/images/previews/gallery1.png)" }} className={"img"} />
                                        </Tilty>
                                        <Tilty reverse max={15}>
                                            <div style={{ backgroundImage: "url(/assets/images/previews/gallery2.png)" }} className={"img"} />
                                        </Tilty>
                                        <Tilty reverse max={15}>
                                            <div style={{ backgroundImage: "url(/assets/images/previews/gallery3.png)" }} className={"img"} />
                                        </Tilty>
                                        <Tilty reverse max={15}>
                                            <div style={{ backgroundImage: "url(/assets/images/previews/gallery4.png)" }} className={"img"} />
                                        </Tilty>
                                    </div>
                                </div>
                            </FadeIn>
                            <FadeIn threshold={1.0}>
                                <a href={"/#/gallery"} className={"link-container content-font small-text"}>Visit Gallery</a>
                            </FadeIn>
                        </div>
                    )
                }} />
                <FadeIn>
                    <hr />
                </FadeIn>
                <ScrollTracker realScrollHeight={800} TrackingComponent={({ progress }) => {
                    // translate the content of this section to add a horizontal parallax scroll effect
                    const translateX = -25 * (3 * progress)

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
                                        <Tilty reverse max={15}>
                                            <div style={{ backgroundImage: "url(/assets/images/previews/timeline1.png)" }} className={"img"} />
                                        </Tilty>
                                        <Tilty reverse max={15}>
                                            <div style={{ backgroundImage: "url(/assets/images/previews/timeline2.png)" }} className={"img"} />
                                        </Tilty>
                                        <Tilty reverse max={15}>
                                            <div style={{ backgroundImage: "url(/assets/images/previews/timeline3.png)" }} className={"img"} />
                                        </Tilty>
                                        <Tilty reverse max={15}>
                                            <div style={{ backgroundImage: "url(/assets/images/previews/timeline4.png)" }} className={"img"} />
                                        </Tilty>
                                    </div>
                                </div>
                            </FadeIn>
                            <FadeIn threshold={1.0}>
                                <a href={"/#/timeline"} className={"link-container content-font small-text"}>Visit Timeline</a>
                            </FadeIn>
                        </div>
                    )
                }} />
                <FadeIn>
                    <hr />
                </FadeIn>
                <ScrollTracker realScrollHeight={400} TrackingComponent={({ progress }) => {
                    // individual horizontal parallax effect on each subject
                    const increasingSlideOffset = -progress * 100 * (3 / 4)
                    const decreasingSlideOffset = -(100 * 3 / 4) - increasingSlideOffset
                    
                    return (
                        <div className={"sticky-content"}>
                            <FadeIn>
                                <div className={"home-page-header-container"}>
                                    <header style={{ backgroundSize: "850px 130px" }} className={"home-page-header-text header-font medium-text"}>Explore Disciplines</header>
                                </div>
                            </FadeIn>
                            <div style={{ display: "display: flex", width: "calc(min(100vw, 1200px))" }} className={"display-container"}>
                                <Tilty reverse max={15} className={"subject-wrapper"}>
                                    <FadeIn>
                                        <a href={"/#/explore/art"} className={"subject-container"}>
                                            <div style={{ transform: `translateY(${decreasingSlideOffset}%)` }} className={"vertical-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/picasso.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/kahlo.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/davinci.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/dali.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Art</div>
                                        </a>
                                    </FadeIn>
                                </Tilty>
                                <Tilty reverse max={15} className={"subject-wrapper"}>
                                    <FadeIn>
                                        <a href={"/#/explore/mathematics"} className={"subject-container"}>
                                            <div style={{ transform: `translateX(${increasingSlideOffset}%)` }} className={"horizontal-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/euler.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/newton.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/lovelace.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/jackson.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Mathematics</div>
                                        </a>
                                    </FadeIn>
                                </Tilty>
                                <Tilty reverse max={15} className={"subject-wrapper"}>
                                    <FadeIn>
                                        <a href={"/#/explore/music"} className={"subject-container"}>
                                            <div style={{ transform: `translateY(${increasingSlideOffset}%)` }} className={"vertical-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/bach.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/strozzi.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/mozart.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/beethoven.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Music</div>
                                        </a>
                                    </FadeIn>
                                </Tilty>
                                <Tilty reverse max={15} className={"subject-wrapper"}>
                                    <FadeIn>
                                        <a href={"/#/explore/science"} className={"subject-container"}>
                                            <div style={{ transform: `translateX(${decreasingSlideOffset}%)` }} className={"horizontal-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/darwin.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/einstein.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/curie.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/pasteur.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Science</div>
                                        </a>
                                    </FadeIn>
                                </Tilty>
                                <Tilty reverse max={15} className={"subject-wrapper"}>
                                    <FadeIn>
                                        <a href={"/#/explore/philosophy"} className={"subject-container"}>
                                            <div style={{ transform: `translateY(${decreasingSlideOffset}%)` }} className={"vertical-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/hypatia.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/aristotle.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/confucius.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/locke.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Philosophy</div>
                                        </a>
                                    </FadeIn>
                                </Tilty>
                                <Tilty reverse max={15} className={"subject-wrapper"}>
                                    <FadeIn>
                                        <a href={"/#/explore/literature"} className={"subject-container"}>
                                            <div style={{ transform: `translateX(${increasingSlideOffset}%)` }} className={"horizontal-slide"}>
                                                <div style={{ backgroundImage: "url(/assets/images/people/qingzhao.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/shakespeare.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/austen.jpg)" }} className={"slide"} />
                                                <div style={{ backgroundImage: "url(/assets/images/people/douglass.jpg)" }} className={"slide"} />
                                            </div>
                                            <div className={"subject-name"}>Literature</div>
                                        </a>
                                    </FadeIn>
                                </Tilty>
                            </div>
                            <FadeIn threshold={1.0}>
                                <a href={"/#/explore/all"} className={"link-container content-font small-text"}>Visit Explore</a>
                            </FadeIn>
                        </div>
                    )
                }} />
                <FadeIn threshold={1.0}>
                    <hr />
                </FadeIn>
                <FadeIn threshold={1.0} delay={"200ms"} className={"footer-container"}>
                    <div style={{ paddingRight: "20px" }} className={"content-font small-text"}>© 2023 Matthew Perlman</div>
                    <div>
                        <a href={"mailto:mattperls.code@gmail.com"} className={"icon"}>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                        <a href={"https://github.com/mattperls-code"} className={"icon"}>
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href={"https://www.instagram.com/mattperls-code"} className={"icon"}>
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </FadeIn>
            </div>
        )
    )
}

export default HomePage