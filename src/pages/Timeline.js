import React, { Suspense, useState } from "react"

import { Canvas, useLoader } from "@react-three/fiber"
import * as THREE from "three"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"

import TimelineImage from "../components/TimelineImage"
import FastText3D from "../components/FastText3D"

import { getTimeline } from "../scripts/data"

// make the 3D "coming toward you" effect with the timeline images
const positionFunction = (x) => {
    const scalar = Math.sqrt(Math.abs(x))
    const num = 3 * x ** 4 + x ** 2
    const den = 2 * x ** 4 + 1000

    return scalar * num / den + 7
}

// abstraction of timeline image to incorporate the 3D interactive movement
const TimelineNode = ({ position, offset, img, name, dob, dod, era, redirectTo }) => {
    const x = position + 5.5 * offset
    
    // clip to prevent lag
    if (Math.abs(x) > 30) return null

    const z = -positionFunction(x)

    const opacity = Math.abs(x) < 10 ? 1 : 1.7 - Math.abs(0.07 * x)

    return (
        <TimelineImage x={x} z={z} opacity={opacity} img={img} name={name} dob={dob} dod={dod} era={era} redirectTo={redirectTo} />
    )
}

// separate component to fix issues synchronization issues with use loader call
const ScrollIndicator = ({ instructionsOpacity }) => {
    const mouseTexture = useLoader(THREE.TextureLoader, "/assets/images/mouse/scroll.png")

    return (
        <mesh position={[0, -28, -50]} rotation={[0, 0, 0]}>
            <boxGeometry args={[10, 10, 0.01]} />
            <meshPhongMaterial transparent opacity={instructionsOpacity} map={mouseTexture} />
        </mesh>
    )
}

const TimelinePage = () => {
    const [position, setPosition] = useState(5)

    const instructionsOpacity = position / 5

    const timelineNodes = []

    getTimeline().forEach((person, index) => {
        timelineNodes.push({ offset: index + 1, ...person })
    })

    const timelineNodeRenders = []

    // dynamically create all the timeline nodes from the json data
    timelineNodes.forEach((node, index) => {
        timelineNodeRenders.push(
            <TimelineNode key={index} position={position} offset={node.offset} img={`/assets/images/people/${node.id}.jpg`} name={node.name} dob={node.born} dod={node.died} era={node.era} redirectTo={`/bio/${node.id}`} />
        )
    })

    return (
        <React.Fragment>
            <Canvas style={{ width: "100vw", height: "100vh", transform: "translateY(-60px)" }} camera={{ position: [0, 0, 0], rotation: [0, 0, 0] }} frameloop={"demand"} onWheel={(e) => {
                setPosition(Math.max(Math.min(position - 0.02 * e.deltaY, 5), -5.5 * timelineNodes.length))
            }}>
                <perspectiveCamera fov={180} />
                <ambientLight color={"white"} intensity={2} />
                {
                    position > 0 ? (
                        <Suspense fallback={null}>
                            <FastText3D width={100} position={[0, 4, -50]} rotation={[0, 0, 0]} scale={[1, 1, 0.02]} fontSize={48} fontFamily={`'Quicksand', sans-serif`} color={"rgb(40, 40, 40)"} opacity={instructionsOpacity}>Scroll Forward To Move Backward Through Time!</FastText3D>
                            <FastText3D width={100} position={[0, -2, -50]} rotation={[0, 0, 0]} scale={[1, 1, 0.02]} fontSize={48} fontFamily={`'Quicksand', sans-serif`} color={"rgb(40, 40, 40)"} opacity={instructionsOpacity}>Click On Anyone To View Their Biography</FastText3D>
                            <FastText3D width={100} position={[0, -20, -50]} rotation={[0, 0, 0]} scale={[1, 1, 0.02]} fontSize={32} fontFamily={`'Quicksand', sans-serif`} color={"rgb(40, 40, 40)"} opacity={instructionsOpacity}>Learn More</FastText3D>
                            <ScrollIndicator instructionsOpacity={instructionsOpacity} />
                        </Suspense>
                    ) : (
                        <Suspense fallback={null}>
                            {
                                timelineNodeRenders
                            }
                        </Suspense>
                    )
                }
            </Canvas>
            <div style={{ position: "absolute", bottom: 0 }}>
                <div className={position > 0 ? "fade fade-out" : "fade fade-in"}>
                    <hr />
                </div>
                <div style={{ transitionDelay: "200ms" }} className={position > 0 ? "fade fade-out footer-container" : "fade fade-in footer-container"}>
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
                </div>
            </div>
        </React.Fragment>
    )
}

export default TimelinePage