import React, { Suspense } from "react"

import { useParams } from "react-router-dom"

import FadeIn from "../components/FadeIn"

import { Canvas } from "@react-three/fiber"
import GalleryImage from "../components/GalleryImage"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"

import { getFromId } from "../scripts/data"

const BioPage = () => {
    // pull id of person from url
    const { id } = useParams()

    // query from json data
    const person = getFromId(id)

    const bioSections = []
    
    // manipulate plain text bio from data into formatted and styled DOM
    person.bio.split("\n\n").forEach((part, index) => {
        if(index == 0){
            bioSections.push(
                <React.Fragment key={index}>
                    {
                        part
                    }
                </React.Fragment>
            )
        } else {
            bioSections.push(
                <React.Fragment key={index}>
                    <br />
                    <br />
                    {
                        part
                    }
                </React.Fragment>
            )
        }
    })

    return (
        <div style={{ width: "100vw", height: "100vh", overflowY: "scroll" }}>
            <div className={"bio-container"}>
                <FadeIn>
                    <div className={"model-container"}>
                        <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 0, 9] }}>
                            <Suspense fallback={null}>
                                <GalleryImage x={0} y={0} w={10} h={10} borderWidth={0.5} angle={10} pitch={5} realHeight={0} img={`/assets/images/people/${person.id}.jpg`} />
                            </Suspense>
                        </Canvas>
                    </div>
                </FadeIn>
                <div className={"description-container"}>
                    <FadeIn delay={"200ms"}>
                        <div className={"person-name header-font medium-text"}>
                            {
                                person.name
                            }
                        </div>
                    </FadeIn>
                    <FadeIn delay={"400ms"}>
                        <div style={{ marginTop: "28px" }} className={"content-font small-text"}>
                            {
                                bioSections
                            }
                        </div>
                    </FadeIn>
                </div>
            </div>
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
}

export default BioPage